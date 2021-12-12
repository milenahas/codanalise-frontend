import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PerfilService } from 'src/app/modules/perfil/shared/perfil.service';
import { Usuario } from 'src/app/modules/usuario/shared/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tornar-mentor',
  templateUrl: './tornar-mentor.component.html',
  styleUrls: ['./tornar-mentor.component.scss']
})
export class TornarMentorComponent implements OnInit {

  formulario: FormGroup;
  erroFormulario: boolean = false;
  email: string = localStorage.getItem('email');
  getDark: string = localStorage.getItem('dark');
  perfil: Usuario;

  constructor(
    public bsModelRef: BsModalService,
    private formBuilder: FormBuilder, 
    private perfilService: PerfilService
    ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.pegarDadosUsuarioEspecifico();
  }

  pegarDadosUsuarioEspecifico(){
    this.perfilService.usuarioEspecifico(this.email).subscribe({
      next: (data) => {
        this.perfil = data;
      },
      error: err => console.log('Erro', err)
    })
  }

  inicializarFormulario(){
    this.formulario = this.formBuilder.group({
      curriculo: ['', Validators.compose([Validators.required])]
    })
  }

  validarFormulario(){
    if (this.formulario.invalid){
      this.erroFormulario = true;
    } else {
      this.erroFormulario = false;
      this.setarMentor();
    }
  }

  setarMentor() {
    this.perfil.mentor = true;

    this.enviarDados();
  }

  // ****************** ENVIA DADOS PARA EDIÇÃO ****************** //
  enviarDados() {
    this.perfilService.editarUsuario(this.perfil)
    .subscribe(
      (data: Usuario) => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Currículo enviado com sucesso!',
          confirmButtonColor: '#118ab2'
        })
        this.onClose();
        console.log(this.perfil)
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

  onClose(){
    this.bsModelRef.hide();
  }

  // ****************** VALIDAÇÕES DE ERRO ******************
  aplicaCssErro(campo) {
    return {
      'is-invalid': this.verificaTouched(campo) && !this.formulario.valid
    }
  }

  verificaTouched(campo) {
    return !this.formulario.get(campo).valid && this.erroFormulario;
  }

}
