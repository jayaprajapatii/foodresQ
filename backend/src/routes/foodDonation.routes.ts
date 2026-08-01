import { Router } from "express";
import {
  createDonation,
  getDonations,
  getDonation,
} from "../controllers/foodDonation.controller.js";

const router = Router();

router.post("/", createDonation);

router.get("/", getDonations);

router.get("/:id", getDonation);

export default router;