import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Usuario } from 'src/app/modules/usuario/shared/usuario';
import { UsuarioService } from 'src/app/modules/usuario/shared/usuario.service';
import { FormModalComponent } from '../../shared/form-modal/form-modal.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  bsModalRef?: BsModalRef;
  isEdit: boolean = false;

  usuario: Usuario;
  formulario: FormGroup;



  constructor(
    private modalService: BsModalService,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {

    this.recuperarDados()

  }

  recuperarDados() {
    this.formulario = this.formBuilder.group({
      nome: ['',],
      sobrenome: ['',],
      email: ['',],
      senha: ['',],

    })

    this.usuarioService.login('camila@teste.com').subscribe({
      next: (data) => {
        this.setarDados(data);
      },
      error: err => console.log('Erro', err)
    })
  }

  setarDados(data) {
    this.formulario.controls.nome.setValue(data.nome)
    this.formulario.controls.sobrenome.setValue(data.sobrenome)
    this.formulario.controls.email.setValue(data.email)
    this.formulario.controls.senha.setValue(data.senha)
  }

  add(fArea) {
    this.bsModalRef = this.modalService.show(FormModalComponent);
    this.bsModalRef.content.area = fArea;
  }

  editar() {
    this.isEdit = !this.isEdit;
  }

  salvar() {
    this.isEdit = !this.isEdit;
  }

  cancelar() {
    this.isEdit = !this.isEdit;
  }

}
