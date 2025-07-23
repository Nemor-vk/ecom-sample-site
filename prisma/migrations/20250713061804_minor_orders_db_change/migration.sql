/*
  Warnings:

  - You are about to drop the column `pricePaid` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `paymentTotal` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amountPaid` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "OrderStatus" ADD VALUE 'PROCESSING';
ALTER TYPE "OrderStatus" ADD VALUE 'SHIPPED';
ALTER TYPE "OrderStatus" ADD VALUE 'RETURNED';

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentTotal" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "pricePaid",
ADD COLUMN     "amountPaid" DECIMAL(10,2) NOT NULL;
