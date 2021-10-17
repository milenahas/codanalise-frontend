import { EventEmitter, Injectable } from '@angular/core';
import { UsuarioService } from 'src/app/modules/usuario/shared/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  // login: string = localStorage.getItem('login');

  constructor(private usuarioService: UsuarioService) { }

  mostrarMenu = new EventEmitter<boolean>();
  menu: boolean = false;

  // mostrarMenu: boolean = false;

  validaLogin(){
    this.mostrarMenu.subscribe(
      mostrar => { this.menu = mostrar }
    )
    
    console.log(this.menu);
    if (this.menu) {
      return true
    } else {
      return false
    }

    // if (this.login === 'true'){
    //   console.log(this.usuarioService.mostrarMenu);
    //   return true;
    // } else {
    //   return false;
    // }
  }


}
