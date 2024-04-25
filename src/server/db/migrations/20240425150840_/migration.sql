/*
  Warnings:

  - The `position` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `years` on the `Jobs` table. All the data in the column will be lost.
  - Added the required column `startingYear` to the `Jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "FOUNDEN_COMPANY_STATUS" ADD VALUE 'LEFT';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "MEDIA_TYPE" ADD VALUE 'REFERENCE_CALL';
ALTER TYPE "MEDIA_TYPE" ADD VALUE 'DECK';

-- AlterEnum
ALTER TYPE "VCorPE" ADD VALUE 'Both';

-- AlterTable
ALTER TABLE "BusinessAngel" ADD COLUMN     "about_english" TEXT,
ADD COLUMN     "location_english" TEXT;

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "about_english" TEXT,
ADD COLUMN     "location_english" TEXT,
DROP COLUMN "position",
ADD COLUMN     "position" TEXT[];

-- AlterTable
ALTER TABLE "Fund" ADD COLUMN     "about" TEXT,
ADD COLUMN     "about_english" TEXT,
ADD COLUMN     "contactPerson" TEXT,
ADD COLUMN     "info" TEXT;

-- AlterTable
ALTER TABLE "Jobs" DROP COLUMN "years",
ADD COLUMN     "endingYear" TEXT,
ADD COLUMN     "startingYear" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PortfolioCompany" ADD COLUMN     "about_english" TEXT;
