import db from '@/lib/prisma';
import {Product, Section } from '../../generated/prisma/client.ts';
import { ExtendedProduct } from '../extendedModelTypes.ts';
import { SITE_ROLES } from '@/app/constants/index.ts';
import { User } from 'next-auth';
import { STATUS_CODES } from '@/app/constants/errorConstants.ts';

export type ExtendedSectionlTagPrisma = Section & {
  products: ExtendedProduct[];
};


export async function getAllPromotionalTags() {
  //get all the categories linked to a section
    
    const sections = await db.section.findMany({
      include : {
        products: {
          include : {
            category:true,
            discount: true,
            image: true,
            sections:true
          }
        },
      }
    })

    return sections;
}

export async function addNewPromotionalTag(promotionTag:Section){
  //get all the categories linked to a section

    const {name, description, imageUrl, isActive} = promotionTag;
    
    const sections = await db.section.create({
      data: {
        name: name,
        description: description,
        imageUrl: imageUrl ?? null,
        isActive: isActive ?? false
      }
    })
    return sections;
}

export async function updatePromotionalTag(promotionTag:Section){

  const {name, description, imageUrl, isActive} = promotionTag;
    
    const updatedSection = await db.section.update({
      where : {
        id : promotionTag.id
      },
      data: {
        name : name,
        description : description,
        isActive : isActive,
        imageUrl : imageUrl
      }
    })

    return updatedSection;
}

// Rename if you prefer: deleteSectionById
export async function deletePromotionAtId( sectionId: string, user:User | undefined, override?: boolean) : Promise<{message:string, code : STATUS_CODES}> {
  
  if(!user) {
     return ({message:'Access denied: admin privileges are required to delete sections.', code: STATUS_CODES.FORBIDDEN });
  }
  else if (user.role != SITE_ROLES.AMDIN) {
    return ({message:'Only admins can delete sections.', code: STATUS_CODES.FORBIDDEN});
  }

  // Fetch counts of related records
  const section = await db.section.findUnique({
    where: { id: sectionId },
    select: {
      id: true,
      _count: { select: { products: true, category: true } },
    },
  });

  if (!section) {
    return ({message:'Section not found.', code: STATUS_CODES.NOT_FOUND });
  }

  const hasLinks =
    (section._count?.products ?? 0) > 0 || (section._count?.category ?? 0) > 0;

  // If linked and no override, block deletion
  if (hasLinks && !override) {
    const details = {
      products: section._count.products,
      categories: section._count.category,
    };
    return ({message:`Cannot delete: section is linked to products or categories ${details}. Admins may use override to force delete.` , code: STATUS_CODES.CONFLICT}
    );
  } else if (!hasLinks || hasLinks && override) {
    await db.section.delete({ where: { id: sectionId } });
    // No relations — safe to delete
    return({message:'Promotion Deleted Successfully' , code: STATUS_CODES.SUCCESS});
  }

}

export async function togglePromotionStatusAtId(tagId:string, status:boolean){
    
    const section = await db.section.update({
      where : {
        id: tagId
      }, 
      data : {
        isActive : status
      }
    })
    return section;
}