import { Router } from "express";
import {
  createDonation,
  getDonations,
  getDonation,
  updateDonation,
  deleteDonation,
} from "../controllers/foodDonation.controller.js";

const router = Router();

router.post("/", createDonation);
router.get("/", getDonations);
router.get("/:id", getDonation);
router.patch("/:id", updateDonation);
router.delete("/:id", deleteDonation);

export default router;