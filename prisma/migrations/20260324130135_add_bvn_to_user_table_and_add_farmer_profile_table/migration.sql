-- CreateEnum
CREATE TYPE "FarmType" AS ENUM ('CROP', 'FISH_FARMING', 'POULTRY', 'LIVESTOCK');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bvn" TEXT;

-- CreateTable
CREATE TABLE "FarmerProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "farmName" TEXT,
    "location" TEXT NOT NULL,
    "farmType" "FarmType" NOT NULL,
    "farmSize" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FarmerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FarmerProfile_userId_key" ON "FarmerProfile"("userId");

-- CreateIndex
CREATE INDEX "FarmerProfile_userId_idx" ON "FarmerProfile"("userId");

-- CreateIndex
CREATE INDEX "FarmerProfile_farmType_idx" ON "FarmerProfile"("farmType");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- AddForeignKey
ALTER TABLE "FarmerProfile" ADD CONSTRAINT "FarmerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
