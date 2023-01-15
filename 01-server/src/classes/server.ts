import { SERVER_PORT } from "./../global/environtment";
import express from "express";
import http from "http";
import socket from "socket.io";
import * as wSocket from "../sockets/socket";

export default class Server {
  private static _instance: Server;

  public app: express.Application;
  public port: number;
  private httpServer: http.Server;
  public io: socket.Server;
  public options: any;

  private constructor() {
    this.options = {
      cors: {
        origin: "http://localhost:4200",
      },
    };
    this.app = express();
    this.port = SERVER_PORT;
    this.httpServer = http.createServer(this.app);
    this.io = new socket.Server(this.httpServer, this.options);

    this.listenSockets();
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  listenSockets() {
    console.log("Socket is up and running");
    this.io.on("connection", (client) => {
      // Connect client
      wSocket.connectClient(client);

      // On login
      wSocket.onSetUser(client);

      // On message
      wSocket.onMesssage(client, this.io);

      // On Disconnected Client
      wSocket.onDisconnect(client);
      // Disconnect user
      // wSocket.disconnectClient(client);
    });
  }

  start(callback: Function): void {
    this.httpServer.listen(this.port, callback());
  }
}
