import { Router } from "express";
import {
  createDonation,
  getDonations,
} from "../controllers/foodDonation.controller.js";

const router = Router();

router.post("/", createDonation);

router.get("/", getDonations);

export default router;