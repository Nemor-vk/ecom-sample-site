-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "gender" "Gender",
ALTER COLUMN "profileImage" DROP NOT NULL;
