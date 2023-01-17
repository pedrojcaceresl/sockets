import { Usuario } from "../classes/usuario";
import { UsuariosLista } from "./../classes/usuarios-lista";
import { Socket } from "socket.io/dist/socket";
import socket from "socket.io";

export const connectedUsers = new UsuariosLista();

export const connectClient = (client: Socket, io: socket.Server) => {
  const user = new Usuario(client.id);
  connectedUsers.agregar(user);
};

export const onDisconnect = (client: Socket, io: socket.Server) => {
  client.on("disconnect", () => {
    console.log(`Client with id ${client.id} is disconnected.`);
    connectedUsers.borrarUsuario(client.id);

    io.emit("active-users", connectedUsers.getLista());
  });
};

export const onMesssage = (client: Socket, io: socket.Server) => {
  client.on("message", (payload: { from: string; body: any }) => {
    console.log(`Message received: ${JSON.stringify(payload, null, 2)}`);
    io.emit("new-message", payload);
  });
};

export const onSetUser = (client: Socket, io: socket.Server) => {
  client.on(
    "config-user",
    (payload: { nombre: string }, callback: Function) => {
      connectedUsers.actualizarNombre(client.id, payload.nombre);

      callback({
        ok: true,
        mensaje: `User ${payload.nombre} has been set`,
      });
      io.emit("active-users", connectedUsers.getLista());
    }
  );
};

// Get Users

export const getUsers = (client: Socket, io: socket.Server) => {
  client.on("get-users", () => {
    console.log("Get users event fired");
    io.to(client.id).emit("active-users", connectedUsers.getLista());
  });
};
