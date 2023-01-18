import { Observable } from 'rxjs';
import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css'],
})
export class ListaUsuariosComponent implements OnInit {
  activeUsers$!: Observable<any>;

  constructor(public chatService: ChatService) {}

  ngOnInit(): void {
    this.activeUsers$ = this.chatService.getActiveUsers();

    // Emit get users
    this.chatService.emitActiveUsers();
  }
}
