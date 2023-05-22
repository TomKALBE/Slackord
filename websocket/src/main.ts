import { createServer } from "http";
import { Server } from "socket.io";
import Env from "./utils/env";
import type { MessageResource, ChannelResource, RelationshipResource } from "./data/resources";

interface ServerToClientEvents {
    "server.new-message": (data: MessageResource) => void;
    "server.new-friend-request": (data: RelationshipResource) => void;
    "server.answer-friend-request": (data: RelationshipResource) => void;
}

interface ClientToServerEvents {
    "client.new-message": (data: MessageResource) => void;
    "client.new-friend-request": (data: RelationshipResource) => void;
    "client.answer-friend-request": (data: RelationshipResource) => void;
    ping: (data: number) => void;
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

    socket.on("ping", async (userId: number) => {
        socketsMap.set(userId, socket.id);
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

    socket.on("client.new-friend-request", async (data) => {
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
            }

        }).catch((error) => {
            console.error(error);
        })
    })

    socket.on("client.answer-friend-request", async (data) => {
        fetch(`${Env.API_URL}/relationships${data.id}`,
            {
                method: "PATCH",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({request_status: data.request_status})
            }
        ).then(async (response) => {
            if (response.ok) {
                const receiverSocketId = socketsMap.get(data.sender_id);

                if (receiverSocketId)
                    io.to(receiverSocketId)
                        .emit('server.answer-friend-request', data)
            }

        }).catch((error) => {
            console.error(error);
        })
    })
});

httpServer.listen({ port: Number(Env.PORT) }, () => {
    console.log('Server running on port', Env.PORT, '...')
});
