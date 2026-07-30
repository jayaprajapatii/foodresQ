import prisma from "../config/prisma.js";
import { CreateFoodDonationInput } from "../types/foodDonation.types.js";

export const createFoodDonation = async (
  data: CreateFoodDonationInput
) => {

  const restaurant = await prisma.user.findUnique({
    where: {
      id: data.restaurantId,
    },
  });

  if (!restaurant) {
    return {
      success: false,
      message: "Restaurant not found",
    };
  }

  if (restaurant.role !== "RESTAURANT") {
    return {
      success: false,
      message: "Only restaurants can create donations",
    };
  }

  const donation = await prisma.foodDonation.create({
    data: {
      foodName: data.foodName,
      quantity: data.quantity,
      unit: data.unit,
      restaurantId: data.restaurantId,
    },
  });

  return {
    success: true,
    donation,
  };
};