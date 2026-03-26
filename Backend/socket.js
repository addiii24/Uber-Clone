import { Server as SocketIOServer } from "socket.io";
import userModel from "./models/user.model.js";
import captainModel from "./models/captain.model.js";
let io;

const userSocketMap = new Map();

export const initializeSocket = (httpServer) => {

  const corsOrigin = "*";

  io = new SocketIOServer(httpServer, {
    cors: {
      origin: corsOrigin,
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log(`client socket id : ${socket.id}`)

    socket.on('join', async (data) => {
      const { userId, userType } = data;
      console.log(`join event received: userId=${userId}, userType=${userType}`)

      if (!userId) {
        console.warn('join event received with no userId — skipping DB update')
        return
      }

      if (userType === 'user') {
        await userModel.findByIdAndUpdate(userId, { $set: { socketId: socket.id } });
        console.log(`user ${userId} joined with socket id ${socket.id}`)

      } else if (userType === 'captain') {
        await captainModel.findByIdAndUpdate(userId, { $set: { socketId: socket.id } });
        console.log(`captain ${userId} joined with socket id ${socket.id}`)
      }
    })


    socket.on("disconnect", () => {
      console.log(`client disconnected : ${socket.id}`)

    });
  });

  // Helps debug why clients fail to connect (e.g. CORS/handshake issues).
  io.engine.on("connection_error", (err) => {
    console.log("socket connection_error:", err?.message || err);
  });

  return io;
};

export const SendMessageToSocketid = (socketId, eventName = "message", payload) => {
  if (!io) {
    throw new Error("Socket.io is not initialized. Call initializeSocket(server) first.");
  }
  if (!socketId) return false;

  io.to(String(socketId)).emit(eventName, payload);
  return true;
};

