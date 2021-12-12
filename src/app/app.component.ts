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
    this.getDark()
  }

  deslogar(){
    this.rota.navigate(['/login']);
  }

  getDark() {
    let getDark: string = localStorage.getItem('dark');
    if(getDark === 'true'){
      return true
    }else {
      return false
    }
  }
  
}
