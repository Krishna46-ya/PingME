-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "password" TEXT,
ADD COLUMN     "varified" BOOLEAN NOT NULL DEFAULT false;
