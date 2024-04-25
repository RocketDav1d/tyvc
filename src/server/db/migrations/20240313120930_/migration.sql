-- AlterEnum
ALTER TYPE "OnboardingStatus" ADD VALUE 'IN_REVIEW';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "onboardingData" JSONB;
