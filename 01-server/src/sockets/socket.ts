import { Usuario } from "../classes/usuario";
import { UsuariosLista } from "./../classes/usuarios-lista";
import { Socket } from "socket.io/dist/socket";
import socket from "socket.io";

export const connectedUsers = new UsuariosLista();

export const connectClient = (client: Socket) => {
  const user = new Usuario(client.id);
  connectedUsers.agregar(user);
};

export const onDisconnect = (client: Socket) => {
  client.on("disconnect", () => {
    console.log(`Client with id ${client.id} is disconnected.`);
    connectedUsers.borrarUsuario(client.id);
  });
};

export const onMesssage = (client: Socket, io: socket.Server) => {
  client.on("message", (payload: { from: string; body: any }) => {
    console.log(`Message received: ${JSON.stringify(payload, null, 2)}`);
    io.emit("new-message", payload);
  });
};

export const onSetUser = (client: Socket, io?: socket.Server) => {
  client.on(
    "config-user",
    (payload: { nombre: string }, callback: Function) => {
      connectedUsers.actualizarNombre(client.id, payload.nombre);

      callback({
        ok: true,
        mensaje: `User ${payload.nombre} has been set`,
      });
    }
  );
};
