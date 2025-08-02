import type { FastifyInstance } from "fastify";
import type { IncomingMessage } from "http";
import type WebSocket from "ws";

type SocketStream = {
  socket: WebSocket;
  raw: IncomingMessage;
};

export default async function notificationSocket(fastify: FastifyInstance) {
  fastify.get("/ws/notifications", { websocket: true }, (socket) => {
    socket.on("message", (message) => {
      console.log("Notificación recibida:", message.toString());
      socket.send(message.toString());
    });

    socket.on("close", () => {
      console.log("Cliente desconectado");
    });
  });
}
