import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Experiencia } from 'src/app/modules/usuario/shared/experiencia';
import { Usuario } from 'src/app/modules/usuario/shared/usuario';
import Swal from 'sweetalert2';
import { PerfilService } from '../../../shared/perfil.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.scss']
})
export class ExperienciaComponent implements OnInit {

  @Input() acao: string;

  formulario: FormGroup;
  perfil: Usuario;
  email: string = localStorage.getItem('email');
  idExp: number;
  indexExp: number;

  constructor(
    public bsModalRef: BsModalRef,
    private perfilService: PerfilService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.pegarDadosUsuarioEspecifico();
    this.inicializarFormulario();

    // ****************** PEGA ID EM CASO DE EDIÇÃO ****************** //
    this.perfilService.editarEmitter.subscribe( id => {
      if(id != undefined) {
        this.idExp = id;
      }
    })
    
  }

  // ****************** PEGA USUÁRIO E SETA VALORES EM CASO DE EDIÇÃO ****************** //
  pegarDadosUsuarioEspecifico(){
    this.perfilService.usuarioEspecifico(this.email).subscribe({
      next: (data) => {
        this.perfil = data;
        for(let i = 0; i<data.exp.length; i++) {
          if(data.exp[i].id === this.idExp){
            this.indexExp = i;
            this.setarValueEdit(data.exp[i]);
          }
        }
        console.log(data)
      },
      error: err => console.log('Erro', err)
    })
  }

  // ****************** INICIALIZA FORMULÁRIO ****************** //
  inicializarFormulario() {
    this.formulario = this.formBuilder.group({
      empresa: ['', [Validators.required, Validators.minLength(3)]],
      cargo: ['', Validators.required],
      cargoAtual: [''],
      dtini: ['', Validators.required],
      dtfim: [''],
    });
  }

  // ****************** VERIFICA SE FORMULARIO ESTÁ VALIDO ****************** //
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

  // ****************** SETA VALORES NO FORMULARIO PARA EDIÇÃO ****************** //
  setarValueEdit(data) {
    this.formulario.controls.empresa.setValue(data.empresa);
    this.formulario.controls.cargo.setValue(data.cargo);
    this.formulario.controls.dtini.setValue(data.dtini);
    this.formulario.controls.dtfim.setValue(data.dtfim);
  }

  // ****************** SETA DADOS NO OBJETO ****************** //
  setarDadosObjeto() {
    if(this.idExp != undefined) {
      this.perfil.exp[this.indexExp] = {
        id: this.idExp,
        empresa: this.formulario.get('empresa').value,
        cargo: this.formulario.get('cargo').value,
        dtini: this.formulario.get('dtini').value,
        dtfim: this.formulario.get('dtfim').value
      }
    }else {
      this.perfil.exp.push({
        empresa: this.formulario.get('empresa').value,
        cargo: this.formulario.get('cargo').value,
        dtini: this.formulario.get('dtini').value,
        dtfim: this.formulario.get('dtfim').value
      });
      
    }
    
    this.enviarDados();
  }

  // ****************** EXCLUSÃO DE EXPERIÊNCIA ****************** //
  excluir() {
    this.perfil.exp.splice(this.indexExp, 1);
    this.enviarDados();
    this.onClose();
  }

  // ****************** ENVIA DADOS PARA EDIÇÃO ****************** //
  enviarDados() {
    this.perfilService.editarUsuario(this.perfil)
    .subscribe(
      (data: Usuario) => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Sucesso!',
          confirmButtonColor: '#118ab2'
        })
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

  // ****************** DESABILITA CAMPO 'DATA FIM' EM CASO DE CARGO ATUAL ****************** //
  cargoAtual() {
    if(this.formulario.get('cargoAtual').value == false){
      this.formulario.get('dtfim').disable();
    }else {
      this.formulario.get('dtfim').enable();
    }
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
