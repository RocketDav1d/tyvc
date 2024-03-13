/*
  Warnings:

  - You are about to drop the column `createdAt` on the `PortfolioCompany` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_fundId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_publisherId_fkey";

-- DropForeignKey
ALTER TABLE "Office" DROP CONSTRAINT "Office_fundId_fkey";

-- AlterTable
ALTER TABLE "FoundedCompanies" ALTER COLUMN "current" SET DEFAULT true,
ALTER COLUMN "exit" SET DEFAULT false,
ALTER COLUMN "failed" SET DEFAULT false;

-- AlterTable
ALTER TABLE "FundGeneration" ADD COLUMN     "year" TEXT;

-- AlterTable
ALTER TABLE "HoldingVehicle" ALTER COLUMN "register" DROP NOT NULL,
ALTER COLUMN "registerNumber" DROP NOT NULL,
ALTER COLUMN "registerNumber" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Media" ALTER COLUMN "fundId" DROP NOT NULL,
ALTER COLUMN "publisherId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Office" ALTER COLUMN "fundId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PortfolioCompany" DROP COLUMN "createdAt";

-- AddForeignKey
ALTER TABLE "Office" ADD CONSTRAINT "Office_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "Fund"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "Fund"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Publisher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
