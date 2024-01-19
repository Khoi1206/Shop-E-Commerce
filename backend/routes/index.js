import userRoutes from "./userRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import express from "express";

const router = express.Router();

router.use("/api/users", userRoutes);
router.use("/api/category", categoryRoutes);

export default router;
