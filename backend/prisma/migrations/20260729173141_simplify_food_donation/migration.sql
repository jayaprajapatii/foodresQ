/*
  Warnings:

  - You are about to drop the column `availableUntil` on the `FoodDonation` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `FoodDonation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."FoodDonation" DROP COLUMN "availableUntil",
DROP COLUMN "status";
