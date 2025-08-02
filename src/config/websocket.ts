import websocket from '@fastify/websocket';

export const registerWebSocket = async (app) => {
  app.register(websocket);
};
