import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Usuario } from 'src/app/modules/usuario/shared/usuario';
import { PerfilService } from '../../shared/perfil.service';
import { ExperienciaComponent } from '../form-modal/experiencia/experiencia.component';
import { SobreComponent } from '../form-modal/sobre/sobre.component';
import { LinguagemComponent } from '../form-modal/linguagem/linguagem.component';
import { EscolaridadeComponent } from '../form-modal/escolaridade/escolaridade.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  bsModalRef?: BsModalRef;
  email: string = localStorage.getItem('email');
  perfil: Usuario;
  loading: boolean = false;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    public perfilService: PerfilService
    ) { }

  ngOnInit(): void {
    this.renderizarPerfil();
  }

  renderizarPerfil(){
    this.loading = true;
    this.perfilService.usuarioEspecifico(this.email).subscribe({
      next: (data) => {
        this.perfilService.perfil = data;
      },
      error: err => console.log('Erro', err)
    })
  }

  add(fAcao?, fArea?) {
    if(fArea === 'experiencia'){
      this.bsModalRef = this.modalService.show(ExperienciaComponent);
    }else if(fArea === 'sobre'){
      this.bsModalRef = this.modalService.show(SobreComponent);
    }else if(fArea === 'skill') {
      this.bsModalRef = this.modalService.show(LinguagemComponent);
    }else if(fArea === 'escolaridade') {
      this.bsModalRef = this.modalService.show(EscolaridadeComponent);
    }
    this.bsModalRef.content.acao = fAcao;
    this.bsModalRef.content.area = fArea;
  }

  editar(id) {
    this.perfilService.editarEmitter.emit(id)
  }
}
