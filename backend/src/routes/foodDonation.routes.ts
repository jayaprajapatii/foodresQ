import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  createDonation,
  getDonations,
  getDonation,
  getMyFoodDonations,
  updateDonation,
  deleteDonation,
  claimDonation,
  pickupDonation,
  completeDonation,
} from "../controllers/foodDonation.controller.js";

const router = Router();

router.post("/", authenticate, createDonation);
router.get("/", getDonations);
router.get("/my", authenticate, getMyFoodDonations);
router.get("/:id", getDonation);
router.patch("/:id", authenticate, updateDonation);
router.delete("/:id", authenticate, deleteDonation);
router.patch("/:id/claim", authenticate, claimDonation);
router.patch("/:id/pickup", authenticate, pickupDonation);
router.patch("/:id/complete", authenticate, completeDonation);

export default router;