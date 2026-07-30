/*
  Warnings:

  - You are about to drop the column `description` on the `FoodDonation` table. All the data in the column will be lost.
  - You are about to drop the column `foodType` on the `FoodDonation` table. All the data in the column will be lost.
  - You are about to drop the column `pickupAddress` on the `FoodDonation` table. All the data in the column will be lost.
  - You are about to drop the column `pickupCity` on the `FoodDonation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."FoodDonation" DROP COLUMN "description",
DROP COLUMN "foodType",
DROP COLUMN "pickupAddress",
DROP COLUMN "pickupCity";
