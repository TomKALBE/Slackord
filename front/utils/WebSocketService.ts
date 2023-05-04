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

interface ServerToClientEvents {
    "server.new-message": (data: Message) => void;
 }

interface ClientToServerEvents {
    "client.new-message": (data: Message) => void;
    "ping": (data: number) => void;
}

const getClientSocket = (url: string) => {

    const clientSocket: ClientSocket = io(url);

    clientSocket.on("connect", () => {
        console.log(clientSocket.connected); // true
    });

    clientSocket.on("server.new-message", (data) => {
        const { addMessageToConversation } = useMessage();
        addMessageToConversation(data);
        //TODO - faire une fonction qui ajoute un message à la conversation
        console.log("server.new-message :", data)
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
    registerUserSocket: (clientSocket: ClientSocket, data: number) => {
        clientSocket.emit("ping", data);
    },
};

export default getClientSocket;
