-- CreateTable
CREATE TABLE "public"."AllPolls" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "question" TEXT NOT NULL,

    CONSTRAINT "AllPolls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Options" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pollsId" TEXT NOT NULL,
    "optionsName" TEXT NOT NULL,
    "like" INTEGER NOT NULL,

    CONSTRAINT "Options_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."AllPolls" ADD CONSTRAINT "AllPolls_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."AllInstaUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Options" ADD CONSTRAINT "Options_pollsId_fkey" FOREIGN KEY ("pollsId") REFERENCES "public"."AllPolls"("id") ON DELETE CASCADE ON UPDATE CASCADE;
