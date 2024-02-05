-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "starRating" INTEGER NOT NULL DEFAULT 0,
    "fundId" TEXT,
    "limitedPartnerId" TEXT,
    "userId" TEXT,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Review_fundId_limitedPartnerId_userId_key" ON "Review"("fundId", "limitedPartnerId", "userId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "Fund"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_limitedPartnerId_fkey" FOREIGN KEY ("limitedPartnerId") REFERENCES "LimitedPartner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
