import { Socket, io } from "socket.io-client";

export type Message = {
  content: String;
  upvote: Number | null;
  type: "PRIVATE" | "PUBLIC" | "CHANNEL";
  created_at: Number;
  updated_at: Number;
  deleted_at: Number | null;
  user_id: Number;
  receiver_id: Number;
};

interface ServerToClientEvents {}

interface ClientToServerEvents {
  "client.new-message": (data: Message) => void;
}

type ClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

const clientSocket: ClientSocket = io(import.meta.env.VITE_SOCKET_URL);

clientSocket.on("connect", () => {
  // clientSocket.emit("ping", "ô monde");
});

clientSocket.on("disconnect", () => {
  console.log(clientSocket.connected); // false
});

export const SocketService = {
  sendMessage: (clientSocket: ClientSocket, data: Message) => {
    clientSocket.emit("client.new-message", data);
  },
};

export default clientSocket;