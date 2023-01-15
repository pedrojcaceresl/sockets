import { Usuario } from "./usuario";

export class UsuariosLista {
  private lista: Usuario[] = [];

  constructor() {}

  // Add user
  public agregar(usuario: Usuario) {
    this.lista.push(usuario);
    console.log(this.lista);

    return usuario;
  }

  public actualizarNombre(id: string, nombre: string) {
    for (let usuario of this.lista) {
      if (usuario.id === id) {
        usuario.nombre = nombre;
        break;
      }
    }

    console.log(`=========== Updating user ============`);
    console.log(this.lista);
  }

  // Get user list
  public getLista() {
    return this.lista;
  }

  // Get an user
  public getUsuario(id: string) {
    return this.lista.find((usuario) => usuario.id === id);
  }

  // Get users in a room
  public getUsuariosEnSala(sala: string) {
    return this.lista.filter((usuario) => usuario.sala === sala);
  }

  // Delete user
  public borrarUsuario(id: string) {
    const tempUsuario = this.getUsuario(id);

    this.lista = this.lista.filter((usuario) => usuario.id !== id);

    return tempUsuario;
  }
}
