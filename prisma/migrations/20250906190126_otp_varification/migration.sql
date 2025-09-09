-- CreateTable
CREATE TABLE "public"."OtpVarification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OtpVarification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."OtpVarification" ADD CONSTRAINT "OtpVarification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
