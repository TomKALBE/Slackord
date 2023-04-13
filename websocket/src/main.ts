import { createServer } from "http";
import { Server } from "socket.io";
import Env from "./utils/env";
import { MessageResource, ChannelResource } from "./data/resources";

interface ServerToClientEvents {
    "server.new-message": (data: MessageResource) => void;
}

interface ClientToServerEvents {
    "client.new-message": (data: MessageResource) => void;
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
});

httpServer.listen(Number(Env.PORT));
