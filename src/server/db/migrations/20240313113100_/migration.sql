/*
  Warnings:

  - You are about to drop the column `current` on the `FoundedCompanies` table. All the data in the column will be lost.
  - You are about to drop the column `exit` on the `FoundedCompanies` table. All the data in the column will be lost.
  - You are about to drop the column `failed` on the `FoundedCompanies` table. All the data in the column will be lost.
  - You are about to drop the column `invesetmentDate` on the `PortfolioCompany` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[payloadID]` on the table `Board` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fundId]` on the table `Board` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companyId]` on the table `Board` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[payloadID]` on the table `BusinessAngel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[payloadID]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[payloadID]` on the table `Fund` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[boardId]` on the table `Fund` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[payloadID]` on the table `Investment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[payloadID]` on the table `Media` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[payloadID]` on the table `Office` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[payloadID]` on the table `PortfolioCompany` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `payloadID` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payloadID` to the `BusinessAngel` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `coInvestors` on the `BusinessAngel` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `payloadID` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payloadID` to the `Fund` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payloadID` to the `Investment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payloadID` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payloadID` to the `Office` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payloadID` to the `PortfolioCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `register` to the `PortfolioCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registerCourt` to the `PortfolioCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registerNumber` to the `PortfolioCompany` table without a default value. This is not possible if the table is not empty.
  - Made the column `investmentStage` on table `PortfolioCompany` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "FOUNDEN_COMPANY_STATUS" AS ENUM ('CURRENT', 'EXIT', 'FAILED');

-- DropForeignKey
ALTER TABLE "Investment" DROP CONSTRAINT "Investment_businessAngelId_fkey";

-- DropForeignKey
ALTER TABLE "Investment" DROP CONSTRAINT "Investment_fundId_fkey";

-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "fundId" TEXT,
ADD COLUMN     "payloadID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BusinessAngel" ADD COLUMN     "payloadID" TEXT NOT NULL,
DROP COLUMN "coInvestors",
ADD COLUMN     "coInvestors" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "newsletter" TEXT,
ADD COLUMN     "payloadID" TEXT NOT NULL,
ADD COLUMN     "youTube" TEXT;

-- AlterTable
ALTER TABLE "FoundedCompanies" DROP COLUMN "current",
DROP COLUMN "exit",
DROP COLUMN "failed",
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "status" "FOUNDEN_COMPANY_STATUS" NOT NULL DEFAULT 'CURRENT';

-- AlterTable
ALTER TABLE "Fund" ADD COLUMN     "boardId" TEXT,
ADD COLUMN     "color" TEXT,
ADD COLUMN     "payloadID" TEXT NOT NULL,
ADD COLUMN     "ticketSize" TEXT;

-- AlterTable
ALTER TABLE "Investment" ADD COLUMN     "investmentDate" TIMESTAMP(3),
ADD COLUMN     "payloadID" TEXT NOT NULL,
ALTER COLUMN "fundId" DROP NOT NULL,
ALTER COLUMN "businessAngelId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "businessAngelId" TEXT,
ADD COLUMN     "payloadID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Office" ADD COLUMN     "payloadID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PortfolioCompany" DROP COLUMN "invesetmentDate",
ADD COLUMN     "investmentDate" TEXT,
ADD COLUMN     "payloadID" TEXT NOT NULL,
ADD COLUMN     "register" TEXT NOT NULL,
ADD COLUMN     "registerCourt" TEXT NOT NULL,
ADD COLUMN     "registerNumber" TEXT NOT NULL,
ALTER COLUMN "investmentStage" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Board_payloadID_key" ON "Board"("payloadID");

-- CreateIndex
CREATE UNIQUE INDEX "Board_fundId_key" ON "Board"("fundId");

-- CreateIndex
CREATE UNIQUE INDEX "Board_companyId_key" ON "Board"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessAngel_payloadID_key" ON "BusinessAngel"("payloadID");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_payloadID_key" ON "Employee"("payloadID");

-- CreateIndex
CREATE UNIQUE INDEX "Fund_payloadID_key" ON "Fund"("payloadID");

-- CreateIndex
CREATE UNIQUE INDEX "Fund_boardId_key" ON "Fund"("boardId");

-- CreateIndex
CREATE UNIQUE INDEX "Investment_payloadID_key" ON "Investment"("payloadID");

-- CreateIndex
CREATE UNIQUE INDEX "Media_payloadID_key" ON "Media"("payloadID");

-- CreateIndex
CREATE UNIQUE INDEX "Office_payloadID_key" ON "Office"("payloadID");

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioCompany_payloadID_key" ON "PortfolioCompany"("payloadID");

-- AddForeignKey
ALTER TABLE "Fund" ADD CONSTRAINT "Fund_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "Fund"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_businessAngelId_fkey" FOREIGN KEY ("businessAngelId") REFERENCES "BusinessAngel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_businessAngelId_fkey" FOREIGN KEY ("businessAngelId") REFERENCES "BusinessAngel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
