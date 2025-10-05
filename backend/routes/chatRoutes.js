import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createChatForApplication, getChatByUsers, addMessageToChat } from "../controllers/chatController.js";

const router = express.Router();

router.post("/create", isAuthenticated, createChatForApplication);
router.get("/get", isAuthenticated, getChatByUsers);
router.post("/message/:chatId", isAuthenticated, addMessageToChat);

export default router;
