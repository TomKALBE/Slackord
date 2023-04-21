import { createServer } from "http";
import { Server } from "socket.io";
import Env from "./utils/env";
import { MessageResource } from "./data/resources";

interface ServerToClientEvents {

}

interface ClientToServerEvents {
    "client.new-message": (data: MessageResource) => void;
}

interface InterServerEvents {
    ping: () => void;
}

interface SocketData { }

const httpServer = createServer();

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, {
    cors: {
        origin: "*",
    },
}).on("connection", async (socket) => {
    socket.on("client.new-message", async (data) => {
        console.log('new message received')
    });
});

httpServer.listen(Number(Env.PORT));
