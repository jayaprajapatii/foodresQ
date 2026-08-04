import { Request, Response } from "express";
import {
  createFoodDonation,
  getAllDonations,
  getDonationById,
  updateFoodDonation,
  deleteFoodDonation,
} from "../services/foodDonation.service.js";

export const createDonation = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const result = await createFoodDonation(
      req.body,
      req.user.userId
    );

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(201).json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getDonations = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await getAllDonations();

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
export const getDonation = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const result = await getDonationById(id);

    if (!result.success) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
export const updateDonation = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const result = await updateFoodDonation(
      id,
      req.body,
      req.user.userId
    );

    if (!result.success) {
      if (result.message === "Donation not found") {
       return res.status(404).json(result);
      }

      if (result.message === "You are not authorized to update this donation") {
        return res.status(403).json(result);
      }

      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
export const deleteDonation = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const result = await deleteFoodDonation(id);

    if (!result.success) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};