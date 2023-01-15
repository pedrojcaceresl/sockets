import { WebsocketService } from 'src/app/services/websocket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css'],
})
export class MensajesComponent implements OnInit {
  constructor(public wsService: WebsocketService) {}

  ngOnInit(): void {}
}
