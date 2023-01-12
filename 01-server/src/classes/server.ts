import { SERVER_PORT } from "./../global/environtment";
import express from "express";

export default class Server {
  public app: express.Application;
  public port: number;

  constructor() {
    this.app = express();
    this.port = SERVER_PORT;
  }

  start(callback: Function): void {
    this.app.listen(this.port, callback());
  }
}
