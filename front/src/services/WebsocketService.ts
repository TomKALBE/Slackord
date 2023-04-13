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

interface ServerToClientEvents {
  "server.new-message": (data: MessageResource) => void;
}

interface ClientToServerEvents {
  "client.new-message": (data: MessageResource) => void;
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

clientSocket.on("disconnect", () => {
  console.log(clientSocket.connected); // false
});

export const SocketService = {
  sendMessage: (clientSocket: ClientSocket, data: MessageResource) => {
    clientSocket.emit("client.new-message", data);
  },
};

export default clientSocket;
