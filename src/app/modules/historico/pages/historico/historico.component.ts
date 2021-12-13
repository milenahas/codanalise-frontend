import { Component, OnInit } from '@angular/core';
import { PerfilService } from 'src/app/modules/perfil/shared/perfil.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent implements OnInit {

  email: string = localStorage.getItem('email');
  getDark: string = localStorage.getItem('dark');
  mentor: boolean;

  constructor(public perfilService: PerfilService) { }

  ngOnInit(): void {
    this.renderizarPerfil();
  }

  renderizarPerfil(){
    this.perfilService.usuarioEspecifico(this.email).subscribe({
      next: (data) => {
        this.isMentor(data);
      },
      error: err => console.log('Erro', err)
    })
  }

  isMentor(data) {
    if(data.mentor === true) {
      this.mentor = true;
    }else {
      this.mentor = false;
    }
  }

}
