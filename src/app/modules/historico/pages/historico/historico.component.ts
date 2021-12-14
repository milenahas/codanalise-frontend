import { Component, OnInit } from '@angular/core';
import { Mentor } from 'src/app/modules/feed/shared/mentor';
import { PerfilService } from 'src/app/modules/perfil/shared/perfil.service';
import { HistoricoService } from '../../shared/historico.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent implements OnInit {

  mentorDados: Mentor;
  listou: boolean = false;

  email: string = localStorage.getItem('email');
  getDark: string = localStorage.getItem('dark');
  mentor: boolean;

  constructor(public perfilService: PerfilService, private historicoService: HistoricoService) { }

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
      this.listarMentor();
    }else {
      this.mentor = false;
      this.listou = true;
    }
  }

  listarMentor(){
    let idUsuario = Number(localStorage.getItem('id'));

    this.historicoService.getMentor(idUsuario)
    .subscribe(
      (data) => {
        this.mentorDados = data;
        this.listou = true;
        console.log(this.mentorDados);
    })
  }

}
