import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthguardService } from './config/guards/authguard.service';
import { UsuarioService } from './modules/usuario/shared/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'codanalise';

  constructor (public authGuardService: AuthguardService, private rota: Router) {  }

  ngOnInit(): void {
  }

  deslogar(){
    this.rota.navigate(['/login']);
  }
  
}
