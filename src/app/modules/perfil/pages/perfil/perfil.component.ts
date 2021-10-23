import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Usuario } from 'src/app/modules/usuario/shared/usuario';
import { FormModalComponent } from '../../shared/form-modal/form-modal.component';
import { PerfilService } from '../../shared/perfil.service';
import Swal from 'sweetalert2'

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
  email: string = localStorage.getItem('email');
  loading: boolean = false;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private perfilService: PerfilService
    ) { }

  ngOnInit(): void {
    this.pegarDadosUsuarioEspecifico();
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.formulario = this.formBuilder.group({
      nome: ['',],
      sobrenome: ['',],
      email: ['',],
      senha: ['',],
      sobre: [''],
      github: [''],
      linkedin: ['']
    });
  }

  pegarDadosUsuarioEspecifico(){
    this.loading = true;
    this.perfilService.usuarioEspecifico(this.email).subscribe({
      next: (data) => {
        this.usuario = data;
        this.setarDadosInput();
      },
      error: err => console.log('Erro', err)
    }).add(() => {
      this.loading = false;
    })
  }

  setarDadosInput() {
    this.formulario.controls.nome.setValue(this.usuario.nome);
    this.formulario.controls.sobrenome.setValue(this.usuario.sobrenome);
    this.formulario.controls.email.setValue(this.usuario.email);
    this.formulario.controls.senha.setValue(this.usuario.senha);
    this.formulario.controls.sobre.setValue(this.usuario.sobre);
    this.formulario.controls.github.setValue(this.usuario.github);
    this.formulario.controls.linkedin.setValue(this.usuario.linkedin);
  }

  // *************************************
  // *********** Alterar dados ***********
  // *************************************

  alterarDadosUsuario(){
    this.setarDadosObjeto();

    this.perfilService.editarUsuario(this.usuario)
    .subscribe(
      (data: Usuario) => {
        Swal.fire(
          'Sucesso!',
          'Os dados foram alterados com sucesso!',
          'success'
        ).then((result) => {
          location.reload();
          this.isEdit = !this.isEdit;
        });

    },
    error => {
      Swal.fire(
        'Erro',
        'Verifique os dados e tente novamente.',
        'error'
      ).then((result) => {
        this.isEdit = true;
      });
    })
  }

  setarDadosObjeto(){
    this.usuario.nome = this.formulario.controls.nome.value;
    this.usuario.sobrenome = this.formulario.controls.sobrenome.value;
    this.usuario.email = this.formulario.controls.email.value;
    this.usuario.senha = this.formulario.controls.senha.value;
    this.usuario.sobre = this.formulario.controls.sobre.value;
    this.usuario.github = this.formulario.controls.github.value;
    this.usuario.linkedin = this.formulario.controls.linkedin.value;
  }

  add(fArea) {
    this.bsModalRef = this.modalService.show(FormModalComponent);
    this.bsModalRef.content.area = fArea;
  }

  // Botões

  editar() {
    this.isEdit = !this.isEdit;
  }

  salvar() {
    this.alterarDadosUsuario();
  }

  cancelar() {
    this.isEdit = !this.isEdit;
  }

  setarMentor(){
    this.usuario.mentor = true;
  }

}
