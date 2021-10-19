import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../shared/usuario';
import { UsuarioService } from '../../shared/usuario.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  formulario: FormGroup;

  usuario: Usuario;
  validaErroSenha: boolean = false;

  get form(){
    return this.formulario.controls;
  }

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService, private rota: Router) { }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(){
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required])],
      sobrenome: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      dataNasc: ['', Validators.compose([Validators.required])],
      genero: ['', Validators.compose([Validators.required])],
      senha: ['', Validators.compose([Validators.required])],
      confirmarSenha: ['', Validators.compose([Validators.required])],
      termos: ['', Validators.compose([Validators.required, Validators.pattern('true')])]
    });
  }

  validaFormulario(){
    this.checaSenha();

    if (this.formulario.invalid){
      Object.keys(this.formulario.controls).forEach(campo => {
        const controle = this.formulario.get(campo);
        controle.markAsDirty();
      });
    } else if (this.checaSenha()){
      this.setarDadosObjeto();
    }
  }

  checaSenha(){
    if (this.formulario.get('confirmarSenha').dirty){
      if (this.form.senha.value === this.form.confirmarSenha.value){
        this.validaErroSenha = false;
        return true;
      } else {
        this.validaErroSenha = true;
        return false;
      }
    }
  }

  setarDadosObjeto(){
    this.usuario = {
      nome: this.form.nome.value,
      sobrenome: this.form.sobrenome.value,
      email: this.form.email.value,
      nascimento: (this.form.dataNasc.value + "T23:59:00.809+00:00"),
      genero: this.form.genero.value,
      senha: this.form.senha.value,
      mentor: false
    }

    this.enviarCadastro();
  }

  enviarCadastro(){
    this.usuarioService.cadastrar(this.usuario)
    .subscribe(
      (data: Usuario) => {
        Swal.fire(
          'Sucesso!',
          'O cadastro foi efetuado com sucesso!',
          'success'
        )
        this.rota.navigate(['/login']);
    },
    error => {
      Swal.fire(
        'Erro',
        'Algo deu errado.',
        'error'
      )
    }
    )
  }

  // ****************** VALIDAÇÕES ******************

  aplicaCssErro(campo) {
    return {
      'is-invalid': this.verificaTouched(campo) && !this.formulario.valid
    }
  }

  verificaTouched(campo) {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).dirty;
  }

}
