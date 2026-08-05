-- AlterTable
ALTER TABLE "public"."FoodDonation" ADD COLUMN     "claimedById" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."FoodDonation" ADD CONSTRAINT "FoodDonation_claimedById_fkey" FOREIGN KEY ("claimedById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
