import { WebsocketService } from 'src/app/services/websocket.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private wsService: WebsocketService) {}

  sendMessage(message: string) {
    const payload = {
      from: this.wsService.usuario.nombre,
      body: message,
    };

    this.wsService.emit('message', payload);
  }

  getMessages() {
    return this.wsService.listen('new-message');
  }

  getPrivateMessages() {
    return this.wsService.listen('mensaje-privado');
  }

  getActiveUsers() {
    return this.wsService.listen('active-users');
  }

  emitActiveUsers() {
    return this.wsService.emit('get-users');
  }
}
