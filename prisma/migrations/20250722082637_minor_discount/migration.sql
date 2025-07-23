/*
  Warnings:

  - You are about to drop the column `applicableCategories` on the `Discount` table. All the data in the column will be lost.
  - You are about to drop the column `applicableProducts` on the `Discount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "discountId" TEXT;

-- AlterTable
ALTER TABLE "Discount" DROP COLUMN "applicableCategories",
DROP COLUMN "applicableProducts";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "discountId" TEXT;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_discountId_fkey" FOREIGN KEY ("discountId") REFERENCES "Discount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_discountId_fkey" FOREIGN KEY ("discountId") REFERENCES "Discount"("id") ON DELETE SET NULL ON UPDATE CASCADE;
