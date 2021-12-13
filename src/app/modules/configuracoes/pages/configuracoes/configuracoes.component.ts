import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PerfilService } from 'src/app/modules/perfil/shared/perfil.service';
import { TornarMentorComponent } from '../../components/tornar-mentor/tornar-mentor.component';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss']
})
export class ConfiguracoesComponent implements OnInit {

  bsModalRef?: BsModalRef;
  email: string = localStorage.getItem('email');
  mentor: boolean;
  getDark: string = localStorage.getItem('dark');

  constructor(private modalService: BsModalService, public perfilService: PerfilService) { }

  ngOnInit(): void {
    this.renderizarPerfil();
  }

  abrirModalTornarMentor(){
    this.bsModalRef = this.modalService.show(TornarMentorComponent);
  }

  renderizarPerfil(){
    this.perfilService.usuarioEspecifico(this.email).subscribe({
      next: (data) => {
        this.isMentor(data);
      },
      error: err => console.log('Erro', err)
    })
  }

  darkMode(modo) {
    
    if(modo === true) {
      localStorage.setItem('dark', 'true');
    }else if(modo === false) {
      localStorage.setItem('dark', 'false');
    }

    location.reload()
  }

  isMentor(data) {
    if(data.mentor === true) {
      this.mentor = true;
    }else {
      this.mentor = false;
    }
  }

}
