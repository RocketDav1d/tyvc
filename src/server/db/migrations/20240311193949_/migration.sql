-- DropForeignKey
ALTER TABLE "Board" DROP CONSTRAINT "Board_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_officeId_fkey";

-- AlterTable
ALTER TABLE "Board" ALTER COLUMN "employeeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "officeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "Office"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
