import type WebSocket from 'ws';
import type { IncomingMessage } from 'http';

type SocketStream = {
  socket: WebSocket;
  raw: IncomingMessage;
};

const clients = new Set<SocketStream>();

export function addClient(client: SocketStream) {
  clients.add(client);
}

export function removeClient(client: SocketStream) {
  clients.delete(client);
}

export function broadcastNotification(payload: any) {
  const message = JSON.stringify(payload);
  for (const client of clients) {
    client.socket.send(message);
  }
}
