-- CreateEnum
CREATE TYPE "OnboardingStatus" AS ENUM ('APPROVED', 'REJECTED', 'PENDING');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN', 'SUPERADMIN');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "oauth_token_secret" TEXT,
    "oauth_token" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "imageSrc" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "onboardingStatus" "OnboardingStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "GamificationAward" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "about" TEXT,

    CONSTRAINT "GamificationAward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fund" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "logo" TEXT,
    "headquarter" TEXT,
    "topics" TEXT[],
    "stages" TEXT[],
    "description" TEXT,
    "foundingDate" TIMESTAMP(3),
    "website" TEXT,
    "linkedIn" TEXT,
    "twitter" TEXT,
    "medium" TEXT,
    "youTube" TEXT,
    "instagram" TEXT,
    "newsletter" TEXT,
    "email" TEXT,
    "phoneNumber" TEXT,
    "pitchFormular" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Fund_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Office" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "thumbnail" TEXT,
    "street" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "city" TEXT,
    "country" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "fundId" TEXT NOT NULL,

    CONSTRAINT "Office_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "profilePicture" TEXT,
    "startingDate" TIMESTAMP(3),
    "vita" TEXT,
    "stage" TEXT[],
    "topics" TEXT[],
    "languages" TEXT[],
    "role" TEXT,
    "linkedIn" TEXT,
    "medium" TEXT,
    "twitter" TEXT,
    "email" TEXT,
    "phone" TEXT,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FundGeneration" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "size" TEXT,
    "publishedAt" TIMESTAMP(3),
    "fundId" TEXT NOT NULL,

    CONSTRAINT "FundGeneration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LimitedPartner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "headquarter" TEXT,
    "targets" TEXT[],
    "description" TEXT,
    "foundingDate" TIMESTAMP(3),
    "website" TEXT,
    "linkedIn" TEXT,
    "twitter" TEXT,
    "medium" TEXT,
    "youTube" TEXT,
    "instagram" TEXT,
    "newsletter" TEXT,
    "email" TEXT,
    "phoneNumber" TEXT,
    "pitchFormular" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LimitedPartner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessAngel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "profilePicture" TEXT,
    "location" TEXT,
    "topics" TEXT[],
    "stages" TEXT[],
    "about" TEXT,
    "foundingDate" TIMESTAMP(3),
    "website" TEXT,
    "linkedIn" TEXT,
    "twitter" TEXT,
    "medium" TEXT,
    "youTube" TEXT,
    "instagram" TEXT,
    "newsletter" TEXT,
    "email" TEXT,
    "phoneNumber" TEXT,
    "pitchFormular" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BusinessAngel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Founder" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "position" TEXT,
    "serialFounder" BOOLEAN NOT NULL DEFAULT false,
    "desciption" TEXT,
    "linkedIn" TEXT,
    "twitter" TEXT,
    "medium" TEXT,
    "youTube" TEXT,
    "instagram" TEXT,
    "newsletter" TEXT,
    "email" TEXT,
    "phoneNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Founder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortfolioCompany" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "logo" TEXT,
    "about" TEXT,
    "funding" TEXT,
    "valuation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PortfolioCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "thumbnail" TEXT,
    "url" TEXT,
    "type" TEXT,
    "fundId" TEXT NOT NULL,
    "publisherId" TEXT NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publisher" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "url" TEXT NOT NULL,
    "foundingDate" TIMESTAMP(3),
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Publisher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "organizer" TEXT,
    "headerImage" TEXT,
    "pricing" TEXT[],
    "url" TEXT,
    "date" TIMESTAMP(3),
    "street" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "city" TEXT,
    "country" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EmployeeToFund" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_FounderToPortfolioCompany" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Fund_slug_key" ON "Fund"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessAngel_slug_key" ON "BusinessAngel"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Founder_slug_key" ON "Founder"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioCompany_slug_key" ON "PortfolioCompany"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Publisher_url_key" ON "Publisher"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_EmployeeToFund_AB_unique" ON "_EmployeeToFund"("A", "B");

-- CreateIndex
CREATE INDEX "_EmployeeToFund_B_index" ON "_EmployeeToFund"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FounderToPortfolioCompany_AB_unique" ON "_FounderToPortfolioCompany"("A", "B");

-- CreateIndex
CREATE INDEX "_FounderToPortfolioCompany_B_index" ON "_FounderToPortfolioCompany"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Office" ADD CONSTRAINT "Office_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "Fund"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FundGeneration" ADD CONSTRAINT "FundGeneration_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "Fund"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "Fund"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Publisher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmployeeToFund" ADD CONSTRAINT "_EmployeeToFund_A_fkey" FOREIGN KEY ("A") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmployeeToFund" ADD CONSTRAINT "_EmployeeToFund_B_fkey" FOREIGN KEY ("B") REFERENCES "Fund"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FounderToPortfolioCompany" ADD CONSTRAINT "_FounderToPortfolioCompany_A_fkey" FOREIGN KEY ("A") REFERENCES "Founder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FounderToPortfolioCompany" ADD CONSTRAINT "_FounderToPortfolioCompany_B_fkey" FOREIGN KEY ("B") REFERENCES "PortfolioCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;
