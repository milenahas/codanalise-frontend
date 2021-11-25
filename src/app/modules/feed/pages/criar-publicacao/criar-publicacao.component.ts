import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { Linguagens } from '../../shared/linguagens';
import { Publicacao } from '../../shared/publicacao';
import { PublicacaoService } from '../../shared/publicacao.service';

@Component({
  selector: 'app-criar-publicacao',
  templateUrl: './criar-publicacao.component.html',
  styleUrls: ['./criar-publicacao.component.scss']
})
export class CriarPublicacaoComponent implements OnInit {

  formulario: FormGroup;
  publicacao: Publicacao;
  allLinguagens: Linguagens;
  linguagens: Array<String> = [];
  valorForm: String = '';

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private publicacaoService: PublicacaoService
    ) { }

  ngOnInit(): void {

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
    let valor = this.valorForm
    if(valor === ''){
      valor = 'Grátis'
    }
    this.publicacao = {
      titulo: this.formulario.controls.titulo.value,
      descricao: this.formulario.controls.descricao.value,
      valor: valor,
      arquivo: this.formulario.controls.arquivo.value,
      linguagens: this.linguagens
    }
    this.enviarDados();
    this.bsModalRef.hide();
  }

  // ****************** ENVIA DADOS PARA O BACK ****************** //
  enviarDados() {
    /*this.publicacaoService.cadastrar(this.publicacao)
    .subscribe(
      (data: Publicacao) => {
        Swal.fire(
          'Sucesso!',
          'Publicação realizada com sucesso!',
          'success'
        )
    },
    error => {
      Swal.fire(
        'Erro',
        'Algo deu errado.',
        'error'
      )
    }
    )*/
  }

  // ****************** ADICIONA LINGUAGEM E VALIDA SE TEM MAIS QUE QUATRO TAGS ****************** //
  addLinguagem(linguagem) {
    if(this.linguagens.length > 3){
      Swal.fire({
        position: 'top',
        icon: 'warning',
        title: 'Você exedeu o limite de tags para remover basta clicar na tag',
        showConfirmButton: false,
        timer: 1500
      })
    }else if(linguagem != '') {
      this.linguagens.push(linguagem)
    }
  }

  // ****************** REMOVE LINGUAGEM AO SELECIONAR ****************** //
  removeLinguagem(linguagem) {
    let selectedLinguagem = this.linguagens.indexOf(linguagem)
    this.linguagens.splice(selectedLinguagem, 1);
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
