/*
  Warnings:

  - You are about to drop the column `role` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `startingDate` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `GamificationAward` table. All the data in the column will be lost.
  - You are about to drop the `News` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[boardId]` on the table `PortfolioCompany` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `officeId` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `GamificationAward` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BOARD_STATUS" AS ENUM ('ACTIVE', 'DEACTIVE');

-- CreateEnum
CREATE TYPE "Diversity" AS ENUM ('WHITE_MALE', 'WHITE_FEMALE', 'BLACK_MALE', 'BLACK_FEMALE');

-- CreateEnum
CREATE TYPE "CompanyDiversity" AS ENUM ('ONLY_WHITE_MALE_FOUNDERS', 'ONLY_WHITE_FEMALE_FOUNDERS', 'ONLY_POC_MALE_FOUNDERS', 'ONLY_POC_FEMALE_FOUNDERS', 'MIN_1_W', 'MIN_1_POC', 'MIN_1_W_POC');

-- CreateEnum
CREATE TYPE "MEDIA_TYPE" AS ENUM ('PODCAST', 'ARTICLE', 'VIDEO');

-- DropForeignKey
ALTER TABLE "News" DROP CONSTRAINT "News_fundId_fkey";

-- DropForeignKey
ALTER TABLE "News" DROP CONSTRAINT "News_publisherId_fkey";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "BusinessAngel" ADD COLUMN     "diversity" "Diversity" NOT NULL DEFAULT 'WHITE_MALE',
ADD COLUMN     "ticketSize" TEXT;

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "role",
DROP COLUMN "startingDate",
ADD COLUMN     "about" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "diversity" "Diversity" NOT NULL DEFAULT 'WHITE_MALE',
ADD COLUMN     "location" TEXT,
ADD COLUMN     "officeId" TEXT NOT NULL,
ADD COLUMN     "position" TEXT,
ADD COLUMN     "sector" TEXT[],
ADD COLUMN     "skill" TEXT[],
ADD COLUMN     "startingYear" TEXT,
ADD COLUMN     "university" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "FundGeneration" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "GamificationAward" DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Office" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "PortfolioCompany" ADD COLUMN     "boardId" TEXT,
ADD COLUMN     "diversity" "CompanyDiversity" NOT NULL DEFAULT 'ONLY_WHITE_MALE_FOUNDERS',
ADD COLUMN     "invesetmentDate" TEXT,
ADD COLUMN     "investmentStage" TEXT,
ADD COLUMN     "sector" TEXT[];

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "businessAngelId" TEXT;

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "News";

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "businessAngelId" TEXT,
    "founderId" TEXT,
    "limitedPartnerId" TEXT,
    "employeeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Board" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "BOARD_STATUS" NOT NULL DEFAULT 'ACTIVE',
    "year" TEXT,
    "companyId" TEXT,
    "employeeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Investment" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION,
    "announcedAt" TIMESTAMP(3),
    "fundId" TEXT NOT NULL,
    "portfolioCompanyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Investment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "MEDIA_TYPE" NOT NULL DEFAULT 'ARTICLE',
    "description" TEXT,
    "thumbnail" TEXT,
    "url" TEXT,
    "publishedAt" TIMESTAMP(3),
    "fundId" TEXT NOT NULL,
    "publisherId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FundToPortfolioCompany" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EmployeeToInvestment" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FundToPortfolioCompany_AB_unique" ON "_FundToPortfolioCompany"("A", "B");

-- CreateIndex
CREATE INDEX "_FundToPortfolioCompany_B_index" ON "_FundToPortfolioCompany"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EmployeeToInvestment_AB_unique" ON "_EmployeeToInvestment"("A", "B");

-- CreateIndex
CREATE INDEX "_EmployeeToInvestment_B_index" ON "_EmployeeToInvestment"("B");

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioCompany_boardId_key" ON "PortfolioCompany"("boardId");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_businessAngelId_fkey" FOREIGN KEY ("businessAngelId") REFERENCES "BusinessAngel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_founderId_fkey" FOREIGN KEY ("founderId") REFERENCES "Founder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_limitedPartnerId_fkey" FOREIGN KEY ("limitedPartnerId") REFERENCES "LimitedPartner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "Office"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioCompany" ADD CONSTRAINT "PortfolioCompany_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "Fund"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_portfolioCompanyId_fkey" FOREIGN KEY ("portfolioCompanyId") REFERENCES "PortfolioCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "Fund"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Publisher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_businessAngelId_fkey" FOREIGN KEY ("businessAngelId") REFERENCES "BusinessAngel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FundToPortfolioCompany" ADD CONSTRAINT "_FundToPortfolioCompany_A_fkey" FOREIGN KEY ("A") REFERENCES "Fund"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FundToPortfolioCompany" ADD CONSTRAINT "_FundToPortfolioCompany_B_fkey" FOREIGN KEY ("B") REFERENCES "PortfolioCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmployeeToInvestment" ADD CONSTRAINT "_EmployeeToInvestment_A_fkey" FOREIGN KEY ("A") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmployeeToInvestment" ADD CONSTRAINT "_EmployeeToInvestment_B_fkey" FOREIGN KEY ("B") REFERENCES "Investment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
