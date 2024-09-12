import WebSocket from "ws";
import { UserId } from "../model/user-user-id";

const userWebSocketMap: Map<UserId, WebSocket> = new Map();

export const wsServer = new WebSocket.Server({ noServer: true });

wsServer.on("connection", (ws, req) => {
  const userId = req.headers["sec-websocket-protocol"] as UserId; 

  if (userId) {
    registerUserWebSocket(userId, ws);
  }

  ws.on("message", (message) => {
    console.log("Received message:", message.toString());
  });

  ws.on("close", () => {
    userWebSocketMap.forEach((socket, userId) => {
      if (socket === ws) {
        userWebSocketMap.delete(userId);
      }
    });
  });

  ws.send("Welcome to the WebSocket server!");
});

const registerUserWebSocket = (userId: UserId, ws: WebSocket) => {
  userWebSocketMap.set(userId, ws);
};

export const sendMessageToUser = (userId: UserId, message: string) => {
  const socket = userWebSocketMap.get(userId);
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(message);
  } else {
    console.log(`User ${userId} is not connected`);
  }
};
