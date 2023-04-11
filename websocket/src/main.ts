import * as dotenv from 'dotenv';

import { Server } from "socket.io";

dotenv.config();

console.log(process.env.PORT);


const io = new Server(Number(process.env.PORT));

io.on("connection", (socket) => {
  console.log("a user connected");
});
