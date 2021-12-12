import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Usuario } from 'src/app/modules/usuario/shared/usuario';
import Swal from 'sweetalert2';
import { PerfilService } from '../../../shared/perfil.service';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.scss']
})
export class SobreComponent implements OnInit {

  formulario: FormGroup;
  perfil: Usuario;
  email: string = localStorage.getItem('email');
  getDark: string = localStorage.getItem('dark');

  constructor(
    public bsModalRef: BsModalRef,
    private perfilService: PerfilService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.pegarDadosUsuarioEspecifico();
    this.inicializarFormulario();
  }

  // ****************** PEGA USUÁRIO E SETA VALORES PARA EDIÇÃO ****************** //
  pegarDadosUsuarioEspecifico(){
    this.perfilService.usuarioEspecifico(this.email).subscribe({
      next: (data) => {
        this.perfil = data;
        this.setarValueEdit(data);
      },
      error: err => console.log('Erro', err)
    })
  }

  // ****************** INICIALIZA FORMULÁRIO ****************** //
  inicializarFormulario() {
    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      sobrenome: ['', [Validators.required, Validators.minLength(3)]],
      genero: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3), Validators.email]],
      nascimento: ['', Validators.required],
      github: [''],
      linkedin: [''],
      sobre: [''],
      status: [''],
    });
  }

  // ****************** VALIDA FORMULÁRIO ****************** //
  onSubmit() {
    if (!this.formulario.valid){
      Object.keys(this.formulario.controls).forEach(campo => {
        const controle = this.formulario.get(campo);
        controle.markAsTouched();
      });
    }else {
      this.setarDadosObjeto();
    }
  }

  // ****************** SETA VALORES NO FORMULÁRIO PARA EDIÇÃO ****************** //
  setarValueEdit(data) {
    this.formulario.controls.nome.setValue(data.nome);
    this.formulario.controls.sobrenome.setValue(data.sobrenome);
    this.formulario.controls.genero.setValue(data.genero);
    this.formulario.controls.senha.setValue(data.senha);
    this.formulario.controls.email.setValue(data.email);
    this.formulario.controls.nascimento.setValue(data.nascimento);
    this.formulario.controls.github.setValue(data.github);
    this.formulario.controls.linkedin.setValue(data.linkedin);
    this.formulario.controls.sobre.setValue(data.sobre);
    this.formulario.controls.status.setValue(data.status);
  }

  // ****************** SETA VALORES NO OBJETO ****************** //
  setarDadosObjeto() {
      this.perfil.nome = this.formulario.get('nome').value,
      this.perfil.sobrenome = this.formulario.get('sobrenome').value,
      this.perfil.genero = this.formulario.get('genero').value,
      this.perfil.senha = this.formulario.get('senha').value,
      this.perfil.email = this.formulario.get('email').value,
      this.perfil.nascimento = this.formulario.get('nascimento').value + "T23:59:00.809+00:00",
      this.perfil.github = this.formulario.get('github').value,
      this.perfil.linkedin = this.formulario.get('linkedin').value,
      this.perfil.sobre = this.formulario.get('sobre').value,
      this.perfil.status = this.formulario.get('status').value,

    this.enviarDados();
  }

  // ****************** EVIA DADOS PARA EDIÇÃO ****************** //
  enviarDados() {
    this.perfilService.editarUsuario(this.perfil)
    .subscribe(
      (data: Usuario) => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Dados alterados com sucesso!',
          confirmButtonColor: '#118ab2'
        })
        this.perfilService.perfil = this.perfil;
        this.onClose();
    },
    error => {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Algo deu errado.',
        confirmButtonColor: '#118ab2'
      })
    }
    )
  }

  // ****************** FECHA JANELA ****************** //
  onClose() {
    this.bsModalRef.hide()
  }

  // ****************** VALIDAÇÕES ****************** //
  verificaTouched(campo) {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  aplicaCssErro(campo) {
      return{
        'is-invalid': this.verificaTouched(campo) && !this.formulario.valid
      }
  }

}
