-- CreateEnum
CREATE TYPE "UsageLimitPeriod" AS ENUM ('LIFETIME', 'HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY');

-- AlterTable
ALTER TABLE "Discount" ADD COLUMN     "usageLimitPeriod" "UsageLimitPeriod";
