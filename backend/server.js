import app from "./app.js";
import http from "http";
import { Server } from "socket.io";
import cloudinary from "cloudinary";
import dbConnection from "./database/dbConnection.js";
import { Chat } from "./models/chatSchema.js";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const startServer = async () => {
  try {
    await dbConnection();
    const PORT = process.env.PORT || 4000;
    const httpServer = http.createServer(app);
    const io = new Server(httpServer, {
      cors: {
        origin: ["http://localhost:5173","https://skill-match-92qm.vercel.app"],
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      // join chat room: room id must be employerId_jobSeekerId
      socket.on("joinChat", ({ employerId, jobSeekerId }) => {
        if (!employerId || !jobSeekerId) return;
        const roomId = `${employerId}_${jobSeekerId}`;
        socket.join(roomId);
      });

      // sendMessage: save to DB and emit to room
      socket.on("sendMessage", async ({ employerId, jobSeekerId, senderId, text }) => {
        try {
          if (!employerId || !jobSeekerId || !senderId || !text) return;
          // find or create chat
          let chat = await Chat.findOne({ employerId, jobSeekerId });
          if (!chat) {
            chat = await Chat.create({ employerId, jobSeekerId, messages: [] });
          }
          const msg = { senderId, text, timestamp: new Date() };
          chat.messages.push(msg);
          await chat.save();
          // get the saved message with its _id (subdocument)
          const savedMessage = chat.messages[chat.messages.length - 1];
          const roomId = `${employerId}_${jobSeekerId}`;
          io.to(roomId).emit("receiveMessage", { chatId: chat._id, message: savedMessage });
        } catch (err) {
          console.error("Error saving message:", err.message);
        }
      });
    });

    httpServer.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();

 