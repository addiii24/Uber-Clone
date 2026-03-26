import { Server as SocketIOServer } from "socket.io";
import userModel from "./models/user.model.js";
import captainModel from "./models/captain.model.js";

let io;

export const initializeSocket = (httpServer) => {

  io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // 🔥 GLOBAL ERROR HANDLER (outside connection)
  io.engine.on("connection_error", (err) => {
    console.log("socket connection_error:", err?.message || err);
  });

  io.on("connection", (socket) => {
    console.log(`✅ client connected: ${socket.id}`);

    // ================= JOIN =================
    socket.on('join', async (data) => {
      try {
        const { userId, userType } = data;

        if (!userId) {
          console.warn('⚠️ No userId provided');
          return;
        }

        if (userType === 'user') {
          await userModel.findByIdAndUpdate(userId, { socketId: socket.id });

        } else if (userType === 'captain') {
          await captainModel.findByIdAndUpdate(userId, { socketId: socket.id }, { runValidators: false });
        }

        console.log(`✅ ${userType} ${userId} joined`);

      } catch (error) {
        console.error("Join error:", error);
      }
    });

    // ================= LOCATION UPDATE =================
    socket.on('update-location-captain', async (data) => {
      try {
        const { userId, location } = data;

        if (!userId || !location?.ltd || !location?.lng) {
          return socket.emit('error', { message: 'Invalid data' });
        }

        // ✅ FIXED GEOJSON FORMAT
        await captainModel.findByIdAndUpdate(userId, {
          location: {
            type: "Point",
            coordinates: [location.lng, location.ltd] // 🔥 IMPORTANT
          }
        });

        console.log(`📍 Location updated for captain ${userId}`);

      } catch (error) {
        console.error("Location update error:", error);
      }
    });

    // ================= DISCONNECT =================
    socket.on("disconnect", () => {
      console.log(`❌ client disconnected: ${socket.id}`);
    });
  });

  return io;
};



// ================= SEND MESSAGE =================
export const SendMessageToSocketid = (socketId, eventName = "message", payload) => {
  if (!io) {
    throw new Error("Socket.io is not initialized.");
  }

  if (!socketId) return false;

  io.to(String(socketId)).emit(eventName, payload);
  return true;
};