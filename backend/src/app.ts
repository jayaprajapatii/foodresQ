import express from "express";
import authRoutes from "./routes/auth.routes.js";
import foodDonationRoutes from "./routes/foodDonation.routes.js";

const app = express();

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/donations", foodDonationRoutes);

app.get("/", (req, res) => {
  res.send("surplus-food-resQ API is running...");
});

export default app;