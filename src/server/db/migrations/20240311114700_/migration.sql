/*
  Warnings:

  - You are about to drop the `_FundToPortfolioCompany` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `proRataRights` to the `BusinessAngel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessAngelId` to the `Investment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_FundToPortfolioCompany" DROP CONSTRAINT "_FundToPortfolioCompany_A_fkey";

-- DropForeignKey
ALTER TABLE "_FundToPortfolioCompany" DROP CONSTRAINT "_FundToPortfolioCompany_B_fkey";

-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "businessAngelId" TEXT;

-- AlterTable
ALTER TABLE "BusinessAngel" ADD COLUMN     "coInvestors" TEXT[],
ADD COLUMN     "proRataRights" BOOLEAN NOT NULL,
ADD COLUMN     "sector" TEXT[],
ADD COLUMN     "university" TEXT;

-- AlterTable
ALTER TABLE "Fund" ADD COLUMN     "coInvestors" TEXT[],
ADD COLUMN     "sector" TEXT[],
ADD COLUMN     "skills" TEXT[];

-- AlterTable
ALTER TABLE "Investment" ADD COLUMN     "businessAngelId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_FundToPortfolioCompany";

-- CreateTable
CREATE TABLE "HoldingVehicle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "register" TEXT NOT NULL,
    "registerNumber" INTEGER NOT NULL,
    "businessAngelId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HoldingVehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoundedCompanies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "current" BOOLEAN NOT NULL,
    "exit" BOOLEAN NOT NULL,
    "failed" BOOLEAN NOT NULL,
    "businessAngelId" TEXT NOT NULL,

    CONSTRAINT "FoundedCompanies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jobs" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "years" TEXT NOT NULL,
    "businessAngelId" TEXT NOT NULL,

    CONSTRAINT "Jobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HoldingVehicle_businessAngelId_key" ON "HoldingVehicle"("businessAngelId");

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_businessAngelId_fkey" FOREIGN KEY ("businessAngelId") REFERENCES "BusinessAngel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HoldingVehicle" ADD CONSTRAINT "HoldingVehicle_businessAngelId_fkey" FOREIGN KEY ("businessAngelId") REFERENCES "BusinessAngel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoundedCompanies" ADD CONSTRAINT "FoundedCompanies_businessAngelId_fkey" FOREIGN KEY ("businessAngelId") REFERENCES "BusinessAngel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jobs" ADD CONSTRAINT "Jobs_businessAngelId_fkey" FOREIGN KEY ("businessAngelId") REFERENCES "BusinessAngel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_businessAngelId_fkey" FOREIGN KEY ("businessAngelId") REFERENCES "BusinessAngel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
