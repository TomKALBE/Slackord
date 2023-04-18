import { createServer } from "http";
import { Server } from "socket.io";
import Env from "./utils/env";
import { MessageResource, ChannelResource } from "./data/resources";
import { UserResource } from "./data/resources";

interface ServerToClientEvents {
    "server.new-message": (data: MessageResource) => void;
    "server.new-state": (data: Partial<UserResource>) => void;
}

interface ClientToServerEvents {
    "client.new-message": (data: MessageResource) => void;
    "client.new-state": (data: Partial<UserResource>) => void;
    ping: (data: number) => void;
}

interface InterServerEvents {
    ping: () => void;
}

interface SocketData {
    userId: number,
    channelsId: Map<number, string>,
    relatedUserSockets: Map<number, string>
}

const socketsMap = new Map<number, string>();

const httpServer = createServer();

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, {
    cors: {
        origin: "*",
    },
}).on("connection", async (socket) => {

    socket.data.channelsId = new Map();
    socket.data.relatedUserSockets = new Map();

    socket.on("ping", async (userId: number) => {
        socket.data.userId = userId;
    });

    socket.on("client.new-message", async (data) => {
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

            }).catch((error) => {
                console.error(error);
            })
    });

    socket.on('client.new-state', async (data) => {

        fetch(`${Env.API_URL}/users`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                state: data
            })
        }).then(async (response) => {

            if (response.ok) {

                const res = await fetch(`${Env.API_URL}/users/${socket.data.userId}/related-users`);

                type Resource = {
                    id: number,
                    related_users: UserResource[];
                }

                const user = await res.json() as Resource;
                (await io.fetchSockets()).forEach(socket => {
                    if (user.related_users.
                        find(u => u.id === socket.data.userId)) {
                        socket.join(`user-${user.id}-related`)
                    }
                });

                io.in(`user-${user.id}-related`).emit("server.new-state", data)
            }
        }).catch((e) => {
            console.error(e)
        })

    })
});

httpServer.listen(Number(Env.PORT));
