/*
  Warnings:

  - You are about to drop the column `year` on the `Board` table. All the data in the column will be lost.
  - The `status` column on the `Board` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `foundingDate` on the `BusinessAngel` table. All the data in the column will be lost.
  - You are about to drop the column `pitchFormular` on the `BusinessAngel` table. All the data in the column will be lost.
  - You are about to drop the column `topics` on the `BusinessAngel` table. All the data in the column will be lost.
  - The `status` column on the `FoundedCompanies` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Jobs` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('published', 'draft');

-- DropForeignKey
ALTER TABLE "FundGeneration" DROP CONSTRAINT "FundGeneration_fundId_fkey";

-- AlterTable
ALTER TABLE "Board" DROP COLUMN "year",
ADD COLUMN     "board_status" "BOARD_STATUS" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "endingYear" TEXT,
ADD COLUMN     "singleCompanyName" TEXT,
ADD COLUMN     "singleCompanyNameURL" TEXT,
ADD COLUMN     "startingYear" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'published';

-- AlterTable
ALTER TABLE "BusinessAngel" DROP COLUMN "foundingDate",
DROP COLUMN "pitchFormular",
DROP COLUMN "topics",
ADD COLUMN     "languages" TEXT[],
ADD COLUMN     "skills" TEXT[],
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'published';

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'published';

-- AlterTable
ALTER TABLE "FoundedCompanies" ADD COLUMN     "founded_company_status" "FOUNDEN_COMPANY_STATUS" NOT NULL DEFAULT 'CURRENT',
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'published';

-- AlterTable
ALTER TABLE "Fund" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'published';

-- AlterTable
ALTER TABLE "FundGeneration" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'published',
ALTER COLUMN "fundId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "HoldingVehicle" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'published';

-- AlterTable
ALTER TABLE "Investment" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'published';

-- AlterTable
ALTER TABLE "Jobs" ADD COLUMN     "jobs_status" "JOBS_STATUS" NOT NULL DEFAULT 'CURRENT',
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'published';

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'published';

-- AlterTable
ALTER TABLE "Office" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'published';

-- AlterTable
ALTER TABLE "PortfolioCompany" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'published';

-- AddForeignKey
ALTER TABLE "FundGeneration" ADD CONSTRAINT "FundGeneration_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "Fund"("id") ON DELETE SET NULL ON UPDATE CASCADE;
