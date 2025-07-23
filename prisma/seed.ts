import { PrismaClient } from '../generated/prisma/client.js';
import { findCategoriesBySection, findCategoriesBySectionName, linkAllCategoriesToTrendingSection, updateCategories } from './repository/categoryRepo.js';
import { findAllProducts, findProductsBySectionName, updateAllProductsToIncludeTrendingSection } from './repository/productRepo.js';
import { createNeccessaryRolesAndUsers } from './repository/userRepo.js';
import { sampleData } from './sampleData';

const prisma = new PrismaClient();

async function main() {
  // Using 'prisma.image' because the model is defined as "Image" in the schema.
  // await prisma.image.deleteMany();
  // await prisma.image.createMany({ data: sampleData.images });

  // await prisma.section.deleteMany();
  // await prisma.section.createMany({ data: sampleData.sectionsData });

  // await prisma.category.deleteMany();
  // await prisma.category.createMany({ data: sampleData.categories });

  // await prisma.product.create({
  //   data:{
  //     name:"G-Shock Watch",
  //     price: 15000,
  //     availableForPurchase: true,
  //     categoryId: "c766f3be-6028-4d5f-a2e6-4d29d9ad8cfa",
  //     stock:20,
  //   }
  // })

//   await prisma.product.deleteMany();
//   await prisma.product.createMany({ data: sampleData.products });
      // await updateCategories();
      // await findCategoriesBySectionName('Trending');

      // await updateAllProductsToIncludeTrendingSection()
      // await findProductsBySectionName('Trending')
      // await findAllProducts();
  await createNeccessaryRolesAndUsers();

//   const count = await prisma.product.count({
//   where: { category : {name : 'Electronics'} },
// })



//   await prisma.category.update({
//   where: { name: 'Electronics' },
//   data: { productCount: count },
// })

  
  console.log("DB seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

