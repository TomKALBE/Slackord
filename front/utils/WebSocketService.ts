import { Socket, io } from "socket.io-client";

interface ServerToClientEvents {
    "server.new-message": (data: IMessage, callback?: Function) => void;
    "server.new-friend-request": (
        data: IRelationship,
        callback?: Function
    ) => void;
    "server.answer-friend-request": (
        data: IRelationship,
        callback?: Function
    ) => void;
    "server.new-user-state": (
        data: Partial<IUser>,
        callback?: Function
    ) => void;
}

interface ClientToServerEvents {
    "client.new-message": (data: IMessage, callback?: Function) => void;
    "client.new-friend-request": (
        data: IRelationship,
        callback?: Function
    ) => void;
    "client.answer-friend-request": (
        data: IRelationship,
        callback?: Function
    ) => Promise<any>;

    ping: (data: number, callback?: Function) => void;
    "client.new-user-state": (
        data: Partial<IUser>,
        callback?: Function
    ) => void;
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
        if (callback) {
            callback({ ok: true });
        }
    });

    clientSocket.on(
        "server.answer-friend-request",
        (data: IRelationship, callback) => {
            console.log("response friend request :", data);

            if (callback) {
                useUser().getRelatedUsers();
                callback({ ok: true });
            }
        }
    );

    clientSocket.on(
        "server.new-friend-request",
        (data: IRelationship, callback) => {
            console.log("new friend request :", data);
            useUser().getFriendRequests();
            if (callback) {
                callback({ ok: true });
            }
        }
    );

    clientSocket.on(
        "server.new-user-state",
        (data: Partial<IUser>, callback) => {
            console.log("new user state :", data);

            if (callback) {
                callback({ ok: true });
            }
        }
    );

    return clientSocket;
};

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
    sendFriendRequest: async (clientSocket: ClientSocket, data: IRelationship) => {
        return new Promise((resolve, reject) => {
            clientSocket.emit(
                "client.new-friend-request",
                data,
                (response: any) => {
                    resolve(response);
                }
            );
        });
    },
    answerFriendRequest: async (clientSocket: ClientSocket, data: IRelationship): Promise<undefined> => {
        return new Promise((resolve, reject) => {
            clientSocket.emit(
                "client.answer-friend-request",
                data,
                (response: any) => {
                    resolve(response);
                }
            );
        })
    },
    sendNewUserState: (clientSocket: ClientSocket, data: IUser) => {
        clientSocket.emit("client.new-user-state", data, (response: any) => {
            // console.log(response);
        });
    },
};

export default getClientSocket;
