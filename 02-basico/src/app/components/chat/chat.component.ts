import { ChatService } from './../../services/chat.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  texto: string = '';
  messages: any[] = [];
  scroll!: HTMLElement;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.onMessage();
    this.scroll = document.getElementById('chat-mensajes')!;
  }

  onMessage() {
    this.chatService.getMessages().subscribe((msg) => {
      this.messages.push(msg);
      this.scrollBottomAuto();
    });
  }

  scrollBottomAuto() {
    setTimeout(() => {
      this.scroll.scrollTop = this.scroll.scrollHeight;
    }, 50);
  }

  sendMessage() {
    if (!this.texto) return;
    this.chatService.sendMessage(this.texto);
    this.texto = '';
  }
}
