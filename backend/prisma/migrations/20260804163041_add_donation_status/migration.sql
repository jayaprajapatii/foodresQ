-- AlterTable
ALTER TABLE "public"."FoodDonation" ADD COLUMN     "status" "public"."DonationStatus" NOT NULL DEFAULT 'AVAILABLE';
