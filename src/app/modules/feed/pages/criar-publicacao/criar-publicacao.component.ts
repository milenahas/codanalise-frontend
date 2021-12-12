import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Usuario } from 'src/app/modules/usuario/shared/usuario';
import Swal from 'sweetalert2';
import { Linguagens } from '../../shared/linguagens';
import { Postagem } from '../../shared/postagem';
import { Publicacao } from '../../shared/publicacao';
import { PublicacaoService } from '../../shared/publicacao.service';
import { Tags } from '../../shared/tags';

@Component({
  selector: 'app-criar-publicacao',
  templateUrl: './criar-publicacao.component.html',
  styleUrls: ['./criar-publicacao.component.scss']
})
export class CriarPublicacaoComponent implements OnInit {

  formulario: FormGroup;
  publicacao: Postagem;
  allLinguagens: Linguagens;
  tags: Tags[] = [];
  valorForm: String = '';
  getDark: string = localStorage.getItem('dark');

  // Dados usuário
  usuario: Usuario;
  email: string = localStorage.getItem('email')

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private publicacaoService: PublicacaoService
    ) { }

  ngOnInit(): void {
    this.pegarDadosUsuario();

    this.publicacaoService.getLinguagens().subscribe((data: Linguagens) => {
      this.allLinguagens = data;
    })

    this.inicializaForm()
  }

  // ****************** INICIALIZA O FORMULÁRIO PARA INSERÇÃO DE DADOS ****************** //
  inicializaForm() {
    this.formulario = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      descricao: ['', [Validators.required, Validators.minLength(3)]],
      valor: [''],
      arquivo: [''],
      linguagens: ['', Validators.required]
    })
  }

  // ******** Pega dados do usuário ********
  pegarDadosUsuario(){
    this.publicacaoService.dadosUsuario(this.email).subscribe(
      (data) => {
        this.usuario = data;
    })
  }

  // ****************** SUBMETER E VALIDAR DADOS ****************** //
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

  // ****************** SETA DADOS NO OBJETO DEPOIS DE SUBMETER ****************** //
  setarDadosObjeto() {
    this.publicacao = {
      titulo: this.formulario.controls.titulo.value,
      autor: this.usuario,
      descricao: this.formulario.controls.descricao.value,
      valor: Number(this.formulario.controls.valor.value),
      // arquivo: this.formulario.controls.arquivo.value,
      tags: this.tags
    }
    this.enviarDados();
    this.bsModalRef.hide();
  }

  // ****************** ENVIA DADOS PARA O BACK ****************** //
  enviarDados() {
    this.publicacaoService.cadastrarPostagem(this.publicacao)
    .subscribe(
      (data: Postagem) => {
        Swal.fire(
          'Sucesso!',
          'Publicação realizada com sucesso!',
          'success'
        );
        this.publicacaoService.postagem.push(data);
        this.publicacaoService.idPostagem = data.id;
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

  // ****************** ADICIONA LINGUAGEM E VALIDA SE TEM MAIS QUE QUATRO TAGS ****************** //
  addLinguagem(linguagem) {
    if(this.tags.length > 3){
      Swal.fire({
        position: 'top',
        icon: 'warning',
        title: 'Você exedeu o limite de tags para remover basta clicar na tag',
        showConfirmButton: false,
        timer: 1500
      })
    }else if(linguagem != '') {
      this.tags.push({linguagem: linguagem})
    }
  }

  // ****************** REMOVE LINGUAGEM AO SELECIONAR ****************** //
  removeLinguagem(linguagem) {
    let selectedLinguagem = this.tags.indexOf(linguagem)
    this.tags.splice(selectedLinguagem, 1);
  }

  // ****************** VERIFICA SE TEM ALGUM CAMPO 'SUJO' E PEDE CONFIRMAÇÃO DO USUARIO PARA FECHAR ****************** //
  onCancelClose() {
    var campoSujo: boolean;
    Object.keys(this.formulario.controls).forEach(campo => {
      const controle = this.formulario.get(campo);
      if(controle.dirty){
        campoSujo = true
      }
    });

    if(campoSujo === true){
      Swal.fire({
        position: 'top',
        icon: 'warning',
        title: 'Tem certeza que deseja fechar?',
        confirmButtonColor: '#118ab2',
        cancelButtonText: 'Cancelar',
        showConfirmButton: true,
        showCancelButton: true,
        preConfirm: () => {
          return [
            this.bsModalRef.hide()
          ]
        }
      })
    }else {
      this.bsModalRef.hide()
    }
  }

  // ****************** FECHA POPUP ****************** //
  onClose() {
    this.bsModalRef.hide();
  }

  // ****************** FORMATAR PARA MOEDA BRASILEIRA ****************** //
  converteBrl(value) {
    if(value.search(',') < 0 && value != ''){
      this.valorForm = parseFloat(value).toLocaleString('pt-BR', {minimumFractionDigits: 2});
    }else {
      this.valorForm = value;
    }
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
