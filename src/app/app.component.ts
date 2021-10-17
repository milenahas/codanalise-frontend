import { Component } from '@angular/core';
import { AuthguardService } from './config/guards/authguard.service';
import { UsuarioService } from './modules/usuario/shared/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'codanalise';

  mostrarMenu: boolean = false;

  constructor (private authGuardService: AuthguardService) {  }

  ngOnInit(): void {
    this.authGuardService.mostrarMenu.subscribe(
      mostrar => this.mostrarMenu = mostrar
    )
  }
  // login: string = localStorage.getItem('login');
}
