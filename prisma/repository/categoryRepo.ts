import db from '@/lib/prisma';
import { Category, } from '../../generated/prisma/client.js';
import { ExtendedCategory, } from '../extendedModelTypes.js';

export async function findCategoriesBySectionName(sectionName: string) : Promise<Category[]> {
  //get all the categories linked to a section
    
    const sections = await db.section.findMany({
      where : {
        name : sectionName
      },
      include: {
        category : true
      }
    })

    const categories = sections.map(section => section.category).flat();
    return categories;
}

export async function linkAllCategoriesToTrendingSection() {
    // Fetch the section with the name 'Trending'
    const trendingSection = await db.section.findUnique({
      where: { name: 'Trending' },
    });
  
    if (!trendingSection) {
      console.error('Section "Trending" does not exist!');
      return;
    }
  
    // Fetch all categories
    const categories = await db.category.findMany();
  
    // Update each category to link with the 'Trending' section
    for (const category of categories) {
      await db.category.update({
        where: { id: category.id },
        data: {
          sections: {
            connect: { id: trendingSection.id },
          },
        },
      });
    }
  
    console.log('All categories linked to the "Trending" section!');
}

export async function getAllCategories() {
    
    return (await db.category.findMany({
      include : {
        sections:true,
        // products: true,
        // parent:true,
        subcategories:true,
      }
    }));
}

export const addNewCategory = async (categoryJson: Category) => {
  const category = await db.category.create({
    data: { ...categoryJson, productCount: 1 },
  });
};

export async function updateExistingCategory(categoryData: ExtendedCategory) {

  // console.log("data received at category repo: ", categoryData)

    // Fetch existing sections linked to the category
    const existingCategory = await db.category.findUnique({
      where: { id: categoryData.id },
      include: { sections: true },
    });
    const currentSectionNames = categoryData.sectionNames;

    console.log("existing Category result at category repo: ", existingCategory)

    if (!existingCategory) {
      throw new Error("Category not found To Update");
    }

    const existingSectionNames = existingCategory.sections?.map(section => section.name) ?? [];
    const sectionsToRemove = existingSectionNames.filter(name => !currentSectionNames?.includes(name));
    const sectionsToAdd = currentSectionNames?.filter(name => !existingSectionNames.includes(name))

    console.log("sections to remove ", sectionsToRemove)
    console.log("sections to add ", sectionsToAdd)

    const {name , description, imageUrl, isActive, productCount, subcategories, parentId} = categoryData;
  
    const updatedCategory = await db.category.update({
      where: {
        id: categoryData.id,
      },
      data: {
        name: name,
        description: description,
        imageUrl : imageUrl,
        isActive : isActive,
        productCount : productCount ?? existingCategory.productCount,
        sections: {
          disconnect: sectionsToRemove.map((name) => ({ name })),
          connect: sectionsToAdd?.map((name) => ({ name })),
        },
        parentId: parentId,
      },
      include: {
        sections: true,
      },
    });
      
    console.log("Updated Category DB : ", updatedCategory);
    return categoryData
}

export async function incrementProductCountInCategory(categoryId:string) {
    // ✅ Increment productCount in the related category
  await db.category.update({
    where: { id: categoryId },
    data: {
      productCount: {
        increment: 1,
      },
    },
  })
}

export async function decrementProductCountInCategory(categoryId:string) {

    // ✅ decrement productCount in the related category
  await db.category.update({
    where: { id: categoryId },
    data: {
      productCount: {
        decrement: 1,
      },
    },
  })
}


