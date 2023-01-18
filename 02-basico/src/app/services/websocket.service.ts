import { Usuario } from './../classes/usuario';
import { Socket } from 'ngx-socket-io';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  public socketStatus = false;
  public usuario!: Usuario;

  constructor(private socket: Socket, private router: Router) {
    this.cargarStorage();
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log(`Connected to the server`);
      this.socketStatus = true;
      this.cargarStorage();
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

  loginWS(nombre: string) {
    return new Promise<void>((resolve, reject) => {
      this.emit('config-user', { nombre }, (resp: any) => {
        this.usuario = new Usuario(nombre);
        this.guardarStorage();
        resolve();
      });
    });
  }

  logoutWS() {
    this.usuario.nombre = '';
    localStorage.removeItem('usuario');

    const payload = {
      nombre: 'sin-nombre',
    };

    this.emit('config-user', payload, () => {});
    this.router.navigateByUrl('');
  }

  getUsuario() {
    return this.usuario;
  }
  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage() {
    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario') || '');
      this.loginWS(this.usuario.nombre);
    }
  }
}
