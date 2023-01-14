import { Socket } from "socket.io/dist/socket";
import socket from "socket.io";

export const onDisconnect = (client: Socket) => {
  client.on("disconnect", () => {
    console.log(`Client with id ${client.id} is disconnected.`);
  });
};

export const onMesssage = (client: Socket, io: socket.Server) => {
  client.on("message", (payload: { from: string; body: any }) => {
    console.log(`Message received: ${JSON.stringify(payload, null, 2)}`);
    io.emit("new-message", payload);
  });
};
