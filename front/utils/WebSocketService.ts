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
    "server.new-server-request": (
        data: IServerMemberRequest,
        callback?: Function
    ) => void;
    "server.answer-server-request": (
        data: IServerMemberRequest,
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
    "client.new-server-request": (
        data: IServerMemberRequest,
        callback?: Function
    ) => void;
    "client.answer-server-request": (
        data: IServerMemberRequest,
        callback?: Function
    ) => Promise<any>;
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
            useUser().updateFriendState(data.state, data.id);
            if (callback) {
                callback({ ok: true });
            }
        }
    );

    clientSocket.on(
        "server.answer-server-request",
        (data: IServerMemberRequest, callback) => {
            console.log("response for server request :", data);

            if (callback) {
                callback({ ok: true });
            }
        }
    );

    clientSocket.on(
        "server.new-server-request",
        (data: IServerMemberRequest, callback) => {
            console.log("new server request :", data);

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
        return new Promise((resolve, reject) => {
            clientSocket.emit(
                "client.new-user-state",
                data,
                (response: any) => {
                    resolve(response);
                }
            );
        })
    },
    sendServerMemberRequest: async (clientSocket: ClientSocket, data: IServerMemberRequest) => {
        return new Promise((resolve, reject) => {
            clientSocket.emit(
                "client.new-server-request",
                data,
                (response: any) => {
                    resolve(response);
                }
            );
        });
    },
    answerServerMemberRequest: async (clientSocket: ClientSocket, data: IServerMemberRequest): Promise<undefined> => {
        return new Promise((resolve, reject) => {
            clientSocket.emit(
                "client.answer-server-request",
                data,
                (response: any) => {
                    resolve(response);
                }
            );
        })
    },
};

export default getClientSocket;
