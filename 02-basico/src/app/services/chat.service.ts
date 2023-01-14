import { WebsocketService } from 'src/app/services/websocket.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private wsService: WebsocketService) {}

  sendMessage(message: string) {
    const payload = {
      from: 'Peter',
      body: message,
    };

    this.wsService.emit('message', payload);
  }

  getMessages() {
    return this.wsService.listen('new-message');
  }
}
