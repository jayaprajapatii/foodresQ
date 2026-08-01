import { Request, Response } from "express";
import {
  createFoodDonation,
  getAllDonations,
  getDonationById,
} from "../services/foodDonation.service.js";

export const createDonation = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await createFoodDonation(req.body);

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