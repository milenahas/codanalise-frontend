import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalhe-publicacao',
  templateUrl: './detalhe-publicacao.component.html',
  styleUrls: ['./detalhe-publicacao.component.scss']
})
export class DetalhePublicacaoComponent implements OnInit {

  // Proposta
  formularioProposta: FormGroup;

  // Comentario
  formularioComentario: FormGroup;

  // Etc
  isFavourite: boolean = false;
  comentar: boolean = false;
  propor: boolean = false

  get formProposta(){
    return this.formularioProposta.controls;
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.inicializarFormularioProposta();
    this.inicializarFormularioComentario();
  }

  // *********************
  // Formulário Comentário
  // *********************

  inicializarFormularioProposta(){
    this.formularioProposta = this.formBuilder.group({
      valor: ['', Validators.required],
      comentario: ['', Validators.required]
    })
  }

  removerCampoValor(event){
    if(event.target.checked == true){
      this.formularioProposta.get('valor').disable();
      this.formProposta.valor.clearValidators();
      this.formProposta.valor.updateValueAndValidity();
    } else {
      this.formularioProposta.get('valor').enable();
      this.formProposta.valor.setValidators([Validators.required]);
      this.formProposta.valor.updateValueAndValidity();
    }
  }

  validaFormularioProposta(){
    if (this.formularioProposta.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Dados inválidos.',
        text: 'Por favor, preencha o formulário corretamente.',
        confirmButtonColor: '#118ab2'
      })
    } else {
      this.setarDadosObjetoProposta();
    }
  }

  setarDadosObjetoProposta(){
    Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: 'Proposta enviada com sucesso!',
      confirmButtonColor: '#118ab2'
    })
  }

  // *********************
  // Formulário Comentário
  // *********************

  inicializarFormularioComentario(){
    this.formularioComentario = this.formBuilder.group({
      comentario: ['', Validators.required]
    })
  }

  validarFormularioComentario(){
    if (this.formularioComentario.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Dados inválidos.',
        text: 'Por favor, preencha o formulário corretamente.',
        confirmButtonColor: '#118ab2'
      })
    } else {
      this.setarDadosObjetoComentario();
    }
  }

  setarDadosObjetoComentario(){
    Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: 'Proposta enviada com sucesso!',
      confirmButtonColor: '#118ab2'
    })
  }

  // ****
  // Etc
  // ****

  favourite() {
    this.isFavourite = !this.isFavourite;
  }

  comentando() {
    this.comentar = !this.comentar;
    this.propor = false;
  }
  propondo() {
    this.propor = !this.propor;
    this.comentar = false;
  }

}
