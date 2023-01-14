import { Socket } from 'ngx-socket-io';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  public socketStatus = false;

  constructor(private socket: Socket) {
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log(`Connected to the server`);
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log(`Disconnected from the server`);
      this.socketStatus = false;
    });
  }

  emit(event: string, payload?: any, callback?: Function) {
    this.socket.emit(event, payload, callback);
  }

  listen(event: string) {
    return this.socket.fromEvent(event);
  }
}
