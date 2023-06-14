import { createServer } from "http";
import { Server } from "socket.io";
import Env from "./utils/env";
import type { MessageResource, ChannelResource, RelationshipResource, UserResource } from "./data/resources";

interface ServerToClientEvents {
    "server.new-message": (data: MessageResource, callback?: Function) => void;
    "server.new-friend-request": (data: RelationshipResource, callback?: Function) => void;
    "server.answer-friend-request": (data: RelationshipResource, callback?: Function) => void;
    "server.new-user-state": (data: Partial<UserResource>, callback?: Function) => void;
}

interface ClientToServerEvents {
    "client.new-message": (data: MessageResource, callback?: Function) => void;
    "client.new-friend-request": (data: RelationshipResource, callback?: Function) => void;
    "client.answer-friend-request": (data: RelationshipResource, callback?: Function) => void;
    "client.new-user-state": (data: Partial<UserResource>, callback?: Function) => void;
    ping: (data: number, callback?: any) => void;
}

interface InterServerEvents {
    ping: () => void;
}

interface SocketData {
    userId: number,
    channelsId: Map<number, string>
}

const socketsMap = new Map<number, string>();

const httpServer = createServer();

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, {
    cors: {
        origin: "*",
    },
}).on("connection", async (socket) => {
    console.log("new connection");

    socket.data.channelsId = new Map();

    socket.on('ping', async (userId, callback) => {

        socketsMap.set(userId, socket.id);

        const response = await fetch(`${Env.API_URL}/relationships?senderId=${userId}&receiverId=${userId}`);

        const relationships = await response.json() as Array<any>;

        relationships.forEach(relationship => {
            if (relationship?.senderId === userId && socketsMap.has(relationship?.receiverId)) {

                const receiverSocketId = socketsMap.get(relationship?.receiver_id);

                if (receiverSocketId)
                    io.to(receiverSocketId)
                        .emit('server.new-user-state', { state: 'ONLINE', id: userId });
            }
        })

        if (callback) {
            callback({ ok: true });
        }
    });

    socket.on("disconnect", async (reason) => {

        const userId = socket.data.userId;

        const response = await fetch(`${Env.API_URL}/relationships?senderId=${userId}&receiverId=${userId}`);

        const relationships = await response.json() as Array<any>;
        relationships.forEach(relationship => {
            if (relationship?.senderId === userId && socketsMap.has(relationship?.receiverId)) {

                const receiverSocketId = socketsMap.get(relationship?.receiver_id);

                if (receiverSocketId)
                    io.to(receiverSocketId)
                        .emit('server.new-user-state', { state: 'INVISIBLE', id: userId });
            }
        });
    });

    socket.on("client.new-user-state", async (data, callback) => {

        const user = data;

        fetch(`${Env.API_URL}/users/${user.id}`,
            {
                method: "PATCH",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    state: user.state
                })
            }
        ).then(async (response) => {
            if (response.ok) {

                const response = await fetch(`${Env.API_URL}/relationships?senderId=${user.id}&receiverId=${user.id}`);

                const relationships = await response.json() as Array<any>;

                relationships.forEach(relationship => {
                    if (relationship?.senderId === user.id && socketsMap.has(relationship?.receiverId)) {

                        const receiverSocketId = socketsMap.get(relationship?.receiver_id);

                        if (receiverSocketId)
                            io.to(receiverSocketId)
                                .emit('server.new-user-state', { state: user.state, id: user.id });
                    }
                });
            }

            if (callback) {
                callback({ ok: true });
            }

        }).catch((error) => {
            console.error(error);

            if (callback) {
                callback({ ok: false, msg: "Une erreur s'est produite" });
            }

        })
    })

    socket.on("client.new-message", async (data, callback) => {
        fetch(`${Env.API_URL}/messages`,
            {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(data)

            }).then(async (response) => {
                if (response.ok) {
                    if (data.type === 'PRIVATE') {
                        const receiverSocketId = socketsMap.get(data.receiver_id);

                        if (receiverSocketId)
                            io.to(receiverSocketId)
                                .emit('server.new-message', data)
                    }

                    if (["CHANNEL", 'PUBLIC'].includes(data.type)) {
                        if (!socket.data.channelsId?.has(data.receiver_id)) {
                            const res = await fetch(`${Env.API_URL}/channels/${data.receiver_id}`, {
                                method: "GET"
                            });

                            const channel = await res.json() as ChannelResource;

                            socket.data.channelsId?.set(data.receiver_id, channel.name)

                            socket.join(channel.name);
                        }

                        const channelRoom = socket.data.channelsId?.get(data.user_id)

                        if (channelRoom) {
                            socket.to(channelRoom).emit('server.new-message', data);
                        }
                    }
                }

                if (callback) {
                    callback({ ok: true });
                }

            }).catch((error) => {
                console.error(error);

                if (callback) {
                    callback({ ok: false, msg: "Une erreur s'est produite" });
                }
            })
    });

    socket.on("client.new-friend-request", async (data, callback) => {
        fetch(`${Env.API_URL}/relationships`,
            {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(data)
            }
        ).then(async (response) => {
            if (response.ok) {
                const receiverSocketId = socketsMap.get(data.receiver_id);

                if (receiverSocketId)
                    io.to(receiverSocketId)
                        .emit('server.new-friend-request', data)

                if (callback) {
                    callback({ ok: true });
                }

            }

        }).catch((error) => {
            console.error(error);

            if (callback) {
                callback({ ok: false, msg: "Une erreur s'est produite" });
            }

        })
    })

    socket.on("client.answer-friend-request", async (data, callback) => {
        fetch(`${Env.API_URL}/relationships/${data.id}`,
            {
                method: "PATCH",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ request_status: data.request_status })
            }
        ).then(async (response) => {
            if (response.ok) {
                const receiverSocketId = socketsMap.get(data.sender_id);

                if (receiverSocketId)
                    io.to(receiverSocketId)
                        .emit('server.answer-friend-request', data)

                if (callback) {
                    callback({ ok: true });
                }

            }

        }).catch((error) => {
            console.error(error);

            if (callback) {
                callback({ ok: false, msg: "Une erreur s'est produite" });
            }

        })
    })
});

httpServer.listen({ port: Number(Env.PORT) }, () => {
    console.log('Server running on port', Env.PORT, '...')
});
