import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Linguagens } from 'src/app/modules/feed/shared/linguagens';
import { Usuario } from 'src/app/modules/usuario/shared/usuario';
import Swal from 'sweetalert2';
import { PerfilService } from '../../../shared/perfil.service';

@Component({
  selector: 'app-linguagem',
  templateUrl: './linguagem.component.html',
  styleUrls: ['./linguagem.component.scss']
})
export class LinguagemComponent implements OnInit {

  @Input() acao: string;

  formulario: FormGroup;
  perfil: Usuario;
  email: string = localStorage.getItem('email');
  allLinguagens: Linguagens;
  idLin: number;
  indexLin: number;

  constructor(
    public bsModalRef: BsModalRef,
    private perfilService: PerfilService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.pegarDadosUsuarioEspecifico();
    this.inicializarFormulario();

    // ****************** RENDERIZA TODAS AS LINGUAGENS ****************** //
    this.perfilService.getLinguagens().subscribe((data: Linguagens) => {
      this.allLinguagens = data;
    })

    // ****************** PEGA ID EM CASO DE EDIÇÃO ****************** //
    this.perfilService.editarEmitter.subscribe( id => {
      if(id != undefined) {
        this.idLin = id;
      }
    })

  }

  // ****************** PEGA USUÁRIO E SETA VALORES EM CASO DE EDIÇÃO ****************** //
  pegarDadosUsuarioEspecifico(){
    this.perfilService.usuarioEspecifico(this.email).subscribe({
      next: (data) => {
        this.perfil = data;
        for(let i = 0; i<data.linguagem.length; i++) {
          if(data.linguagem[i].id === this.idLin){
            this.indexLin = i;
            this.setarValueEdit(data.linguagem[i]);
          }
        }
      },
      error: err => console.log('Erro', err)
    })
  }

  // ****************** INICIALIZA O FORMULÁRIO PARA INSERÇÃO DE DADOS ****************** //
  inicializarFormulario() {
    this.formulario = this.formBuilder.group({
      linguagem: ['', Validators.required],
    });
  }

  // ****************** VEIFICA SE FORMULARIO ESTÁ VALIDO ****************** //
  onSubmit() {
    if (!this.formulario.valid){
        this.formulario.controls.linguagem.markAsTouched();
    }else {
      this.setarDadosObjeto();
    }
  }

  setarValueEdit(data) {
    this.formulario.controls.linguagem.setValue(data.ferramenta);

  }

  // ****************** SETA DADOS NO OBJETO ****************** //
  setarDadosObjeto() {
    if(this.indexLin != undefined) {
      this.perfil.linguagem[this.indexLin] = {
        ferramenta: this.formulario.get('linguagem').value,
        exp_ferramenta: 'Intermediario'
      }
    }else {
      this.perfil.linguagem.push({
        ferramenta: this.formulario.get('linguagem').value,
        exp_ferramenta: 'Intermediario', //Remover do back
      });
    }

    this.enviarDados();
  }

  // ****************** EXLUSÃO DE LINGUAGEM ****************** //
  excluir() {
    this.perfil.linguagem.splice(this.indexLin, 1);
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
