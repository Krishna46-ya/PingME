/*
  Warnings:

  - You are about to drop the column `varified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `OtpVarification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."OtpVarification" DROP CONSTRAINT "OtpVarification_userId_fkey";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "varified",
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "public"."OtpVarification";

-- CreateTable
CREATE TABLE "public"."OtpVerification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OtpVerification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."OtpVerification" ADD CONSTRAINT "OtpVerification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
