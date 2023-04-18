import { Socket, io } from "socket.io-client";

export type MessageResource = {
  content: String;
  upvote: Number | null;
  type: "PRIVATE" | "PUBLIC" | "CHANNEL";
  created_at: Number;
  updated_at: Number;
  deleted_at: Number | null;
  user_id: Number;
  receiver_id: Number;
};

export type UserResource = {
  id: number,
  firstname: string;
  lastname: string;
  state: "ONLINE" | "AFK" | "DO NOT DISTURB" | "INVISIBLE"
};

interface ServerToClientEvents {
  "server.new-message": (data: MessageResource) => void;
  "server.new-state": (data: Partial<UserResource>) => void;
}

interface ClientToServerEvents {
  "client.new-message": (data: MessageResource) => void;
  "client.new-state": (data: Partial<UserResource>) => void;
  "ping": (data: number) => void;
}

type ClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

const clientSocket: ClientSocket = io(import.meta.env.VITE_SOCKET_URL);

clientSocket.on("connect", () => {
  clientSocket.emit("ping", 1);
});

clientSocket.on("server.new-message", (data) => {
  console.log(data)
});

clientSocket.on("server.new-state", (data) => {
  console.log(data)
});


clientSocket.on("disconnect", () => {
  console.log(clientSocket.connected); // false
});

export const SocketService = {
  sendMessage: (clientSocket: ClientSocket, data: MessageResource) => {
    clientSocket.emit("client.new-message", data);
  },

  updateState: (clientSocket: ClientSocket, data: Partial<UserResource>) => {
    clientSocket.emit('client.new-state', data)
  }
};

export default clientSocket;
