import { Socket, io } from "socket.io-client";

interface ServerToClientEvents {
    "server.new-message": (data: IMessage, callback?: Function) => void;
    "server.new-friend-request": (data: IRelationship, callback?: Function) => void;
    "server.answer-friend-request": (data: IRelationship, callback?: Function) => void;
}

interface ClientToServerEvents {
    "client.new-message": (data: IMessage, callback?: Function) => void;
    "client.new-friend-request": (data: IRelationship, callback?: Function) => void;
    "client.answer-friend-request": (data: IRelationship, callback?: Function) => void;
    "ping": (data: number, callback?: Function) => void;
}

const getClientSocket = (url: string) => {

    const clientSocket: ClientSocket = io(url);

    clientSocket.on("connect", () => {
        // console.log(clientSocket.connected);
    });

    clientSocket.on("disconnect", () => {
        // console.log(clientSocket.connected);
    });

    clientSocket.on("server.new-message", (data: IMessage, callback) => {
        const { addMessageToConversation } = useMessage();
        addMessageToConversation(data);

        // TODO - faire une fonction qui ajoute un message à la conversation
        console.log("server.new-message :", data)

        if (callback) {
            callback({ ok: true });
        }
    });

    clientSocket.on("server.answer-friend-request", (data: IRelationship, callback) => {
        console.log("response friend request :", data)

        if (callback) {
            callback({ ok: true });
        }
    });


    return clientSocket;

}

type ClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

export const SocketService = {
    sendMessage: (clientSocket: ClientSocket, data: IMessage) => {
        clientSocket.emit("client.new-message", data, (response: any) => {
            // console.log(response);
        });
    },
    registerUserSocket: (clientSocket: ClientSocket, data: number) => {
        clientSocket.emit("ping", data, (response: any) => {
            // console.log(response);
        });
    },
    sendFriendRequest: (clientSocket: ClientSocket, data: IRelationship) => {
        clientSocket.emit("client.new-friend-request", data, (response: any) => {
            // console.log(response);
        });
    },
    answerFriendRequest: (clientSocket: ClientSocket, data: IRelationship) => {
        clientSocket.emit("client.answer-friend-request", data, (response: any) => {
            // console.log(response);
        });
    }
};

export default getClientSocket;
