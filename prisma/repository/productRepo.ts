import db from '@/lib/prisma';
import { ExtendedProduct } from '../extendedModelTypes.js';
import { decrementProductCountInCategory, incrementProductCountInCategory } from './categoryRepo.ts';

export const findAllProducts = async() : Promise<ExtendedProduct[]> => {

  const products = await db.product.findMany({
    include: {
      image: true, 
      category: true,
      sections: true
    },
  });

  // console.log(products)

  return products;
}

export const addNewProduct = async(productJson : ExtendedProduct) => {

    const product = await db.product.create({
        data : {
          name: productJson.name,
          description: productJson.description,
          originalPrice: productJson.originalPrice?.toFixed(2) || null, // Ensure originalPrice is stored as a string with 2 decimal places
          price: productJson.price,
          stock: productJson.stock,
          productType: productJson.productType,
          rating: productJson.rating,
          filePath: productJson.filePath,
          downloadUrl: productJson.downloadUrl,
          availableForPurchase: productJson.availableForPurchase,
          categoryId: productJson.categoryId,
          image: {
            create: productJson.image
          },
        },
        include: {
          image: true, // Include images in the returned product object
        },
    });

    incrementProductCountInCategory(product.categoryId);

    console.log("Product added to db : ", product)
}

export async function findProductsBySectionName(sectionName: string) : Promise<ExtendedProduct[]> {
  //get all the products linked to a section
    
    const sections = await db.section.findMany({
      where : {
        name : sectionName
      },
        include: {
            products: {
                include: {
                image: true, // Include the image array linked to each product
                category: true, // Include the category of each product
                sections: true,
            },
        }
        }

    })
    console.log("sectionName: " + sectionName)
    const products = sections.map(section => section.products).flat();
    console.log(products)
    
    return products;
}

export async function findProductsByCategoryName(categoryName: string) : Promise<ExtendedProduct[]> {
  //get all the products linked to a section
    
    const categoryObj = await db.category.findFirst({
      where : {
        name : {
          equals : categoryName,
          mode : 'insensitive'
        }
      },
        include: {
            products: {
                include: {
                  image: true, // Include the image array linked to each product
                  category: true,
                  sections: true
            },
        }
        }

    })

    console.log("category: ", categoryObj)
    const products:ExtendedProduct[] = categoryObj?.products || [];
    console.log(products)
    
    return products;
}

export async function deleteProductById(productId:string) {

  decrementProductCountInCategory(productId)

  const product = await db.product.delete({
    where : {
      id : productId
    }
  })

  console.log(product.name, " deleted")
  return product
}

export async function findProductById(productId:string): Promise<ExtendedProduct | null> {
  const product = await db.product.findUnique({
    where : {
      id : productId
    },
    include : {
      image : true,
      sections : true,
      category : true,
    }
  })

  console.log("product: ", product)
  return product
}

export async function updateProduct(productJson:ExtendedProduct) {

  // Fetch existing sections linked to the product
  const existingProductData = await db.product.findUnique({
    where: { id: productJson.id },
    include: { sections: true },
  });
  const currentSectionNames = productJson.sectionNames;

  if (!existingProductData) {
    throw new Error("Product not found");
  }

  const existingSectionNames = existingProductData.sections?.map(section => section.name) ?? [];
  const sectionsToRemove = existingSectionNames.filter(name => !currentSectionNames?.includes(name));
  const sectionsToAdd = currentSectionNames?.filter(name => !existingSectionNames.includes(name))

  console.log("sections to remove ", sectionsToRemove)
  console.log("sections to add ", sectionsToAdd)

   const updatedProduct = await db.product.update({
    where : {
      id : productJson.id
    },
    data: {
      name: productJson.name,
      description: productJson.description,
      originalPrice: productJson.originalPrice?.toFixed(2) || null, // Ensure originalPrice is stored as a string with 2 decimal places
      price: productJson.price,
      stock: productJson.stock,
      productType: productJson.productType,
      rating: productJson.rating,
      filePath: productJson.filePath,
      downloadUrl: productJson.downloadUrl,
      availableForPurchase: productJson.availableForPurchase,
      categoryId: productJson.categoryId,
      productTags: productJson.productTags,
      sections: {
        disconnect: sectionsToRemove.map(name => ({name})),
        connect: sectionsToAdd?.map(name => ({ name }))
      }
    },
    include: {
      image : true,
      sections : true,
      category : true,
    }
  })

  // console.log("productRepo - update: ", updatedProduct)
  return updatedProduct
}

export const bulkCreateNewProducts = async (productJsonList: ExtendedProduct[]) => {
  const productsData = productJsonList.map(productJson => ({
    name: productJson.name,
    description: productJson.description,
    originalPrice: productJson.originalPrice?.toFixed(2) || null,
    price: productJson.price,
    stock: productJson.stock,
    productType: productJson.productType,
    rating: productJson.rating,
    filePath: productJson.filePath,
    downloadUrl: productJson.downloadUrl,
    availableForPurchase: productJson.availableForPurchase,
    categoryId: productJson.categoryId,
    // image creation not supported in createMany
  }));

  const result = await db.product.createMany({
    data: productsData,
    skipDuplicates: true, // Optional: skips records with duplicate unique fields
  });

  console.log("Bulk products added:", result);
};
