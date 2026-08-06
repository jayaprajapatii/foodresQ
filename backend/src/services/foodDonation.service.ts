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
  data: UpdateFoodDonationInput,
  restaurantId: number
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
  if (existingDonation.restaurantId !== restaurantId) {
    return {
      success: false,
      message: "You are not authorized to update this donation",
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
export const deleteFoodDonation = async (
  id: number,
  restaurantId: number
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
  if (existingDonation.restaurantId !== restaurantId) {
    return {
      success: false,
      message: "You are not authorized to delete this donation",
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
export const claimFoodDonation = async (
  donationId: number,
  ngoId: number
) => {
  const donation = await prisma.foodDonation.findUnique({
    where: {
      id: donationId,
    },
  });

  if (!donation) {
    return {
      success: false,
      message: "Donation not found",
    };
  }

  if (donation.status !== "AVAILABLE") {
    return {
      success: false,
      message: "Donation is not available for claim",
    };
  }

  const ngo = await prisma.user.findUnique({
    where: {
      id: ngoId,
    },
  });

  if (!ngo || ngo.role !== "NGO") {
    return {
      success: false,
      message: "Only NGOs can claim donations",
    };
  }

  const claimResult = await prisma.foodDonation.updateMany({
    where: {
      id: donationId,
      status: "AVAILABLE",
    },
    data: {
      status: "CLAIMED",
      claimedById: ngoId,
    },
  });

  if (claimResult.count === 0) {
    return {
      success: false,
      message: "Donation is not available for claim",
    };
  }

  const claimedDonation = await prisma.foodDonation.findUnique({
    where: {
      id: donationId,
    },
  });

  return {
    success: true,
    donation: claimedDonation,
  };
}
export const markDonationPickedUp = async (
  donationId: number,
  ngoId: number
) => {
  const donation = await prisma.foodDonation.findUnique({
    where: {
      id: donationId,
    },
  });

  if (!donation) {
    return {
      success: false,
      message: "Donation not found",
    };
  }

  if (donation.status !== "CLAIMED") {
    return {
      success: false,
      message: "Donation is not ready for pickup",
    };
  }

  if (donation.claimedById !== ngoId) {
    return {
      success: false,
      message: "You are not authorized to pick up this donation",
    };
  }

  const updatedDonation = await prisma.foodDonation.update({
    where: {
      id: donationId,
    },
    data: {
      status: "PICKED_UP",
    },
  });

  return {
    success: true,
    donation: updatedDonation,
  };
};
