import { createServer } from "http";
import { Server } from "socket.io";
import Env from "./utils/env";
import type { MessageResource, ChannelResource, RelationshipResource, UserResource, ServerMemberRequestResource } from "./data/resources";

interface ServerToClientEvents {
    "server.new-message": (data: MessageResource, callback?: Function) => void;
    "server.new-friend-request": (data: RelationshipResource, callback?: Function) => void;
    "server.answer-friend-request": (data: RelationshipResource, callback?: Function) => void;
    "server.new-user-state": (data: Partial<UserResource>, callback?: Function) => void;
    "server.new-server-request": (data: ServerMemberRequestResource, callback?: Function) => void;
    "server.new-channel": (data: any, callback?: Function) => void;
}

interface ClientToServerEvents {
    "client.new-message": (data: MessageResource, callback?: Function) => void;
    "client.new-friend-request": (data: RelationshipResource, callback?: Function) => void;
    "client.answer-friend-request": (data: RelationshipResource, callback?: Function) => void;
    "client.new-user-state": (data: Partial<UserResource>, callback?: Function) => void;
    "client.new-server-request": (data: ServerMemberRequestResource, callback?: Function) => void;
    "client.new-channel": (data: any, callback?: Function) => void;
    ping: (data: number, callback?: any) => void;
}

interface InterServerEvents {
    ping: () => void;
}

interface SocketData {
    userId: number,
    user: UserResource,
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
    socket.on("ping", async (userId: number, callback) => {

        socketsMap.set(userId, socket.id);
        socket.data.userId = userId;

        let response = await fetch(`${Env.API_URL}/users/${userId}`);

        const user = await response.json() as UserResource;

        socket.data.user = {
            ...user
        }

        if (user.state !== "INVISIBLE") {
            response = await fetch(`${Env.API_URL}/relationships?request_status_like=ACCEPTED&senderId=${userId}&receiverId=${userId}`);

            const relationships = await response.json() as Array<RelationshipResource>;

            relationships.forEach(relationship => {

                const receiverId = (relationship?.sender_id === userId)
                    ? relationship?.receiver_id
                    : relationship?.sender_id;

                if (socketsMap.has(receiverId)) {
                    const receiverSocketId = socketsMap.get(receiverId);
                    if (receiverSocketId)
                        io.to(receiverSocketId)
                            .emit('server.new-user-state', { state: user.state, id: userId });
                }
            });
        }

        if (callback) {
            callback({ ok: true });
        }
    });

    socket.on("disconnect", async (reason) => {

        const userId = socket.data.userId;

        const response = await fetch(`${Env.API_URL}/relationships?request_status_like=ACCEPTED&senderId=${userId}&receiverId=${userId}`);

        const relationships = await response.json() as Array<RelationshipResource>;

        relationships.forEach(relationship => {
            const receiverId = (relationship?.sender_id === userId)
                ? relationship?.receiver_id
                : relationship?.sender_id;

            if (socketsMap.has(receiverId)) {
                const receiverSocketId = socketsMap.get(receiverId);
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
                const response = await fetch(`${Env.API_URL}/relationships?request_status_like=ACCEPTED&senderId=${user.id}&receiverId=${user.id}`);

                const relationships = await response.json() as Array<RelationshipResource>;
                relationships.forEach(relationship => {
                    const receiverId = (relationship?.sender_id === user.id)
                        ? relationship?.receiver_id
                        : relationship?.sender_id;

                    if (socketsMap.has(receiverId)) {
                        const receiverSocketId = socketsMap.get(receiverId);
                        if (receiverSocketId)
                            io.to(receiverSocketId)
                                .emit('server.new-user-state', { state: user.state, id: user.id });
                    }
                });

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

    socket.on("client.new-message", async (data, callback) => {
        fetch(`${Env.API_URL}/messages`,
            {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(data)

            }).then(async (response) => {
                if (!response.ok)
                    return;

                if (callback)
                    callback({ ok: true });

                if (data.type === 'PRIVATE') {
                    const receiverSocketId = socketsMap.get(data.receiver_id);

                    if (receiverSocketId)
                        io.to(receiverSocketId)
                            .emit('server.new-message', data)
                }

                if (["CHANNEL", 'PUBLIC'].includes(data.type)) {

                    const members = await (fetch(`${Env.API_URL}/servers/${data.receiver_id}?_expand=members`).then(res => res.json()));

                    members.forEach((member: any) => {

                        if (!socketsMap.has(member.userId))
                            return;

                        const receiverSocketId = socketsMap.get(member.userId);

                        if (receiverSocketId) {
                            io.to(receiverSocketId)
                                .emit('server.new-message', data);
                        }
                    });
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

    socket.on("client.new-server-request", async (data, callback) => {

        fetch(`${Env.API_URL}/server-requests`,
            {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(data)
            }
        ).then(async (response) => {
            if (response.ok) {

                const serverData = await (fetch(`${Env.API_URL}/servers/?=name${data.name}`).then(res => res.json()));

                const receiverSocketId = socketsMap.get(serverData.userId);

                if (receiverSocketId) {
                    io.to(receiverSocketId)
                        .emit('server.new-server-request', { ...data, user: socket.data.user })
                }

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

    socket.on("client.new-channel", async (data: any, callback) => {
        fetch(`${Env.API_URL}/channels`,
            {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(data)
            }
        ).then(async (response) => {
            if (response.ok) {
                const channelInfo = await response.json()
                const members = await (fetch(`${Env.API_URL}/servers/${data.serverId}/members?userId_ne=${socket.data.userId}`).then(res => res.json()));

                if (callback) {
                    callback({ ok: true, ...channelInfo });
                }

                members.forEach((member: any) => {

                    if (!socketsMap.has(member.userId)) {
                        return;
                    }

                    const receiverSocketId = socketsMap.get(member.userId);

                    if (receiverSocketId) {
                        io.to(receiverSocketId)
                            .emit('server.new-channel', data);
                    }
                });
            }
        }).catch((error) => {
            console.error(error);
            if (callback) {
                callback({ ok: false, msg: "Une erreur s'est produite" });
            }
        })
    })
});

httpServer.listen({ port: Number(Env.PORT) }, async () => {
    console.log('Server running on port', Env.PORT, '...')
});
