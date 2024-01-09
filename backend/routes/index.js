import userRoutes from "./userRoutes.js";
import express from "express";

const router = express.Router();

router.use("/api/users", userRoutes);

export default router;
