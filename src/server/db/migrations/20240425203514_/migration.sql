-- DropForeignKey
ALTER TABLE "FoundedCompanies" DROP CONSTRAINT "FoundedCompanies_businessAngelId_fkey";

-- DropForeignKey
ALTER TABLE "Jobs" DROP CONSTRAINT "Jobs_businessAngelId_fkey";

-- AlterTable
ALTER TABLE "FoundedCompanies" ALTER COLUMN "businessAngelId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "HoldingVehicle" ADD COLUMN     "registerCourt" TEXT;

-- AlterTable
ALTER TABLE "Jobs" ALTER COLUMN "businessAngelId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "FoundedCompanies" ADD CONSTRAINT "FoundedCompanies_businessAngelId_fkey" FOREIGN KEY ("businessAngelId") REFERENCES "BusinessAngel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jobs" ADD CONSTRAINT "Jobs_businessAngelId_fkey" FOREIGN KEY ("businessAngelId") REFERENCES "BusinessAngel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
