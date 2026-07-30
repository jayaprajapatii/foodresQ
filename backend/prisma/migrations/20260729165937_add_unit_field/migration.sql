/*
  Warnings:

  - Added the required column `unit` to the `FoodDonation` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `quantity` on the `FoodDonation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."FoodDonation" ADD COLUMN     "unit" TEXT NOT NULL,
DROP COLUMN "quantity",
ADD COLUMN     "quantity" INTEGER NOT NULL;
