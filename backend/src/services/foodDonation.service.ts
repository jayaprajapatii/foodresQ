import prisma from "../config/prisma.js";
import {
  CreateFoodDonationInput,
  UpdateFoodDonationInput,
} from "../types/foodDonation.types.js";

export const createFoodDonation = async (
  data: CreateFoodDonationInput,
  restaurantId: number
) => {
  const restaurant = await prisma.user.findUnique({
    where: {
      id: restaurantId,
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
      restaurantId,
    },
  });

  return {
    success: true,
    donation,
  };
};

export const getAllDonations = async () => {
  const donations = await prisma.foodDonation.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    success: true,
    donations,
  };
};
export const getDonationById = async (id: number) => {
  const donation = await prisma.foodDonation.findUnique({
    where: {
      id: id,
    },
  });

  if (!donation) {
    return {
      success: false,
      message: "Donation not found",
    };
  }

  return {
    success: true,
    donation,
  };
};
export const updateFoodDonation = async (
  id: number,
  data: UpdateFoodDonationInput
) => {
  const existingDonation = await prisma.foodDonation.findUnique({
    where: {
      id,
    },
  });

  if (!existingDonation) {
    return {
      success: false,
      message: "Donation not found",
    };
  }

  const donation = await prisma.foodDonation.update({
    where: {
      id,
    },
    data,
  });

  return {
    success: true,
    donation,
  };
};
export const deleteFoodDonation = async (id: number) => {
  const existingDonation = await prisma.foodDonation.findUnique({
    where: {
      id,
    },
  });

  if (!existingDonation) {
    return {
      success: false,
      message: "Donation not found",
    };
  }

  await prisma.foodDonation.delete({
    where: {
      id,
    },
  });

  return {
    success: true,
    message: "Donation deleted successfully",
  };
};