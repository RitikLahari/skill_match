import express from "express";
import { emailsend, changepassword } from "../controllers/otpController.js";
// import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/forgot-password", emailsend);
router.post("/reset-password", changepassword);

export default router;
