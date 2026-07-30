-- CreateEnum
CREATE TYPE "public"."DonationStatus" AS ENUM ('AVAILABLE', 'CLAIMED', 'PICKED_UP', 'COMPLETED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "public"."FoodType" AS ENUM ('VEG', 'NON_VEG', 'VEGAN');

-- CreateTable
CREATE TABLE "public"."FoodDonation" (
    "id" SERIAL NOT NULL,
    "foodName" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "foodType" "public"."FoodType" NOT NULL,
    "description" TEXT,
    "pickupAddress" TEXT NOT NULL,
    "pickupCity" TEXT NOT NULL,
    "availableUntil" TIMESTAMP(3) NOT NULL,
    "status" "public"."DonationStatus" NOT NULL DEFAULT 'AVAILABLE',
    "restaurantId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodDonation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."FoodDonation" ADD CONSTRAINT "FoodDonation_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
