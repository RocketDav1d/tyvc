/*
  Warnings:

  - You are about to drop the column `boardId` on the `Fund` table. All the data in the column will be lost.
  - You are about to drop the column `boardId` on the `PortfolioCompany` table. All the data in the column will be lost.
  - You are about to drop the column `funding` on the `PortfolioCompany` table. All the data in the column will be lost.
  - You are about to drop the column `investmentDate` on the `PortfolioCompany` table. All the data in the column will be lost.
  - You are about to drop the column `investmentStage` on the `PortfolioCompany` table. All the data in the column will be lost.
  - Changed the type of `status` on the `Jobs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "VCorPE" AS ENUM ('VC', 'PE');

-- CreateEnum
CREATE TYPE "JOBS_STATUS" AS ENUM ('CURRENT', 'LEFT', 'FIRED', 'OTHER');

-- AlterEnum
ALTER TYPE "MEDIA_TYPE" ADD VALUE 'DOCUMENT';

-- DropForeignKey
ALTER TABLE "Fund" DROP CONSTRAINT "Fund_boardId_fkey";

-- DropForeignKey
ALTER TABLE "PortfolioCompany" DROP CONSTRAINT "PortfolioCompany_boardId_fkey";

-- DropIndex
DROP INDEX "Board_companyId_key";

-- DropIndex
DROP INDEX "Board_fundId_key";

-- DropIndex
DROP INDEX "Fund_boardId_key";

-- DropIndex
DROP INDEX "PortfolioCompany_boardId_key";

-- AlterTable
ALTER TABLE "Fund" DROP COLUMN "boardId",
ADD COLUMN     "PEorVC" "VCorPE",
ADD COLUMN     "image" TEXT,
ADD COLUMN     "username" TEXT;

-- AlterTable
ALTER TABLE "Investment" ADD COLUMN     "investmentStage" TEXT;

-- AlterTable
ALTER TABLE "Jobs" DROP COLUMN "status",
ADD COLUMN     "status" "JOBS_STATUS" NOT NULL;

-- AlterTable
ALTER TABLE "PortfolioCompany" DROP COLUMN "boardId",
DROP COLUMN "funding",
DROP COLUMN "investmentDate",
DROP COLUMN "investmentStage";

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "Fund"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "PortfolioCompany"("id") ON DELETE SET NULL ON UPDATE CASCADE;
