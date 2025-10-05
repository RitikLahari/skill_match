import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Chat } from "../models/chatSchema.js";

export const createChatForApplication = catchAsyncErrors(async (req, res, next) => {
  // Only employer can initialize chat
  if (req.user.role !== "Employer") {
    return next(new ErrorHandler("Only employers can start chat.", 403));
  }

  const { employerId, jobSeekerId } = req.body;
  if (!employerId || !jobSeekerId) {
    return next(new ErrorHandler("employerId and jobSeekerId required", 400));
  }

  // check existing chat
  let chat = await Chat.findOne({ employerId, jobSeekerId });
  if (!chat) {
    chat = await Chat.create({ employerId, jobSeekerId, messages: [] });
  }

  res.status(200).json({ success: true, chat });
});

export const getChatByUsers = catchAsyncErrors(async (req, res, next) => {
  const { employerId, jobSeekerId } = req.query;
  if (!employerId || !jobSeekerId) {
    return next(new ErrorHandler("employerId and jobSeekerId required", 400));
  }
  const chat = await Chat.findOne({ employerId, jobSeekerId });
  if (!chat) return res.status(200).json({ success: true, chat: null });
  res.status(200).json({ success: true, chat });
});

export const addMessageToChat = catchAsyncErrors(async (req, res, next) => {
  const { chatId } = req.params;
  const { senderId, text } = req.body;
  if (!chatId || !senderId || !text) {
    return next(new ErrorHandler("chatId, senderId and text required", 400));
  }
  const chat = await Chat.findById(chatId);
  if (!chat) return next(new ErrorHandler("Chat not found", 404));
  chat.messages.push({ senderId, text, timestamp: new Date() });
  await chat.save();
  res.status(200).json({ success: true, message: chat.messages[chat.messages.length - 1] });
});
