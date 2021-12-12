import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Usuario } from 'src/app/modules/usuario/shared/usuario';
import Swal from 'sweetalert2';
import { PerfilService } from '../../../shared/perfil.service';

@Component({
  selector: 'app-escolaridade',
  templateUrl: './escolaridade.component.html',
  styleUrls: ['./escolaridade.component.scss']
})
export class EscolaridadeComponent implements OnInit {

  @Input() acao: string;

  formulario: FormGroup;
  perfil: Usuario;
  email: string = localStorage.getItem('email');
  getDark: string = localStorage.getItem('dark');
  idEsco: number;
  indexEsco: number;

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
        this.idEsco = id;
      }
    })

  }

  // ****************** PEGA USUÁRIO E SETA VALORES EM CASO DE EDIÇÃO ****************** //
  pegarDadosUsuarioEspecifico(){
    this.perfilService.usuarioEspecifico(this.email).subscribe({
      next: (data) => {
        this.perfil = data;
        for(let i = 0; i<data.escolaridade.length; i++) {
          if(data.escolaridade[i].id === this.idEsco){
            this.indexEsco = i;
            this.setarValueEdit(data.escolaridade[i]);
          }
        }
      },
      error: err => console.log('Erro', err)
    })
  }

  // ****************** INICIALIZA FORMULÁRIO ****************** //
  inicializarFormulario() {
    this.formulario = this.formBuilder.group({
      instituicao: ['', [Validators.required, Validators.minLength(3)]],
      nivel: ['', Validators.required],
      emAndamento: [''],
      dtini: ['', Validators.required],
      dtfim: ['', Validators.required],
    });
  }

  // ****************** VERIFICA SE O FORMULÁRIO ESTÁ VÁLIDO ****************** //
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
    this.formulario.controls.instituicao.setValue(data.instituicao);
    this.formulario.controls.nivel.setValue(data.nivel);
    this.formulario.controls.dtini.setValue(data.dtini);
    this.formulario.controls.dtfim.setValue(data.dtfim);
  }

  // ****************** SETA DADOS NO OBJETO ****************** //
  setarDadosObjeto() {
    if(this.idEsco != undefined) {
      this.perfil.escolaridade[this.indexEsco] = {
        id: this.idEsco,
        instituicao: this.formulario.get('instituicao').value,
        nivel: this.formulario.get('nivel').value,
        dtini: this.formulario.get('dtini').value,
        dtfim: this.formulario.get('dtfim').value,
        usuario_id: this.perfil.id
      }
    }else {
      this.perfil.escolaridade.push({
        instituicao: this.formulario.get('instituicao').value,
        nivel: this.formulario.get('nivel').value,
        dtini: this.formulario.get('dtini').value,
        dtfim: this.formulario.get('dtfim').value,
      });
    }

    this.enviarDados();
  }

  // ****************** EXCLUSÃO DE ESCOLARIDADE ****************** //
  excluir() {
    this.perfil.escolaridade.splice(this.indexEsco, 1);
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
  // ****************** DESABILITA CAMPO 'DATA FIM' EM CASO DE EM ANDAMENTO ****************** //
  emAndamento() {
    if(this.formulario.get('emAndamento').value == false){
      this.formulario.get('dtfim').disable();
      this.formulario.controls.dtfim.clearValidators();
      this.formulario.controls.dtfim.updateValueAndValidity();
    }else {
      this.formulario.get('dtfim').enable();
      this.formulario.controls.dtfim.setValidators([Validators.required]);
      this.formulario.controls.dtfim.updateValueAndValidity();
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
