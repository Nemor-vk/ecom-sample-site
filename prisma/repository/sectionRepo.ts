import db from '@/lib/prisma';
import {Section } from '../../generated/prisma/client.js';
import { ExtendedPromotionalTag } from '../extendedModelTypes.js';

export async function getAllPromotionalTags() : Promise<ExtendedPromotionalTag[]> {
  //get all the categories linked to a section
    
    const sections = await db.section.findMany({
      include : {
        products: true,
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

    // db.$disconnect();
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

export async function deletePromotionAtId(tagId:string){
    
    const section = await db.section.delete({
      where : {
        id: tagId
      }
    })

    return section;
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