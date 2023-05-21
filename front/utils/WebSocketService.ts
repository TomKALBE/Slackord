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

export type Relationship = {
    sender_id: number,
    receiver_id: number
    request_status: "ACCEPTED" | "DECLINED"
};

interface ServerToClientEvents {
    "server.new-message": (data: Message) => void;
    "server.new-friend-request": (data: Relationship) => void;
    "server.answer-friend-request": (data: Relationship) => void;
}

interface ClientToServerEvents {
    "client.new-message": (data: Message) => void;
    "client.new-friend-request": (data: Relationship) => void;
    "client.answer-friend-request": (data: Relationship) => void;
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
    sendFriendRequest: (clientSocket: ClientSocket, data: Relationship) => {
        clientSocket.emit("client.new-friend-request", data);
    },
    answerFriendRequest: (clientSocket: ClientSocket, data: Relationship) => {
        clientSocket.emit("client.answer-friend-request", data);
    }
};

export default getClientSocket;
