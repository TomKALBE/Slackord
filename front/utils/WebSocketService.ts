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

interface ServerToClientEvents { }

interface ClientToServerEvents {
    "client.new-message": (data: Message) => void;
}

const getClientSocket = (url: string) => {

    const clientSocket: ClientSocket = io(url);

    clientSocket.on("connect", () => {
        console.log(clientSocket.connected); // false
    });

    clientSocket.on("disconnect", () => {
        console.log(clientSocket.connected); // false
    });

    return clientSocket;

}

type ClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>;



export const SocketService = {
    sendMessage: (clientSocket: ClientSocket, data: Message) => {
        clientSocket.emit("client.new-message", data);
    },
};

export default getClientSocket;
