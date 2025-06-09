import express from "express";
import { statsController } from "../controllers/statsController.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.get("/stats",isAuthenticated,statsController);

export default router