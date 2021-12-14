import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Comentarios } from '../../shared/comentarios';
import { Mentor } from '../../shared/mentor';
import { Postagem } from '../../shared/postagem';
import { Propostas } from '../../shared/propostas';
import { PublicacaoService } from '../../shared/publicacao.service';

@Component({
  selector: 'app-detalhe-publicacao',
  templateUrl: './detalhe-publicacao.component.html',
  styleUrls: ['./detalhe-publicacao.component.scss']
})
export class DetalhePublicacaoComponent implements OnInit {

  // Dados
  dadosDetalhePostagem: Postagem = this.publicacaoService.detalhePostagem;

  // Proposta
  formularioProposta: FormGroup;

  // Comentario
  formularioComentario: FormGroup;
  dadosComentario: Comentarios;
  comentarios = this.publicacaoService.comentarios;

  // Etc
  isFavourite: boolean = false;
  comentar: boolean = true;
  propor: boolean = false
  postagemEspecifica: Postagem;
  idPostagem = Number(localStorage.getItem('idPostagem'));
  getDark: string = localStorage.getItem('dark');

  // Usuario
  // nome = this.publicacaoService.usuario.nome;
  // sobrenome = this.publicacaoService.usuario.sobrenome;

  get formProposta(){
    return this.formularioProposta.controls;
  }

  constructor(private formBuilder: FormBuilder, public publicacaoService: PublicacaoService) { }

  ngOnInit(): void {
    this.inicializarFormularioProposta();
    this.inicializarFormularioComentario();
    this.listarComentarios();
    this.listarPostagemEspecifica(this.idPostagem);
    this.pegarDadosUsuario();
  }

  // *********************
  // Formulário Comentário
  // *********************

  removerCampoValor(event){
    if(event.target.checked == true){
      this.formularioProposta.controls.valor.setValue('');
      this.formularioProposta.get('valor').disable();
      this.formProposta.valor.clearValidators();
      this.formProposta.valor.updateValueAndValidity();
    } else {
      this.formularioProposta.get('valor').enable();
      this.formProposta.valor.setValidators([Validators.required]);
      this.formProposta.valor.updateValueAndValidity();
    }
  }

  // *********************
  // Formulário Comentário
  // *********************

  listarComentarios(){
    this.publicacaoService.listarComentarios()
    .subscribe(
      (data: Comentarios[]) => {
        this.publicacaoService.comentarios = data;
    })
  }

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
    this.dadosComentario = {
      autorComent: this.publicacaoService.usuario,
      comentario: this.formularioComentario.controls.comentario.value,
      postagem_id: this.postagemEspecifica.id
    }
    this.enviarComentario();
  }

  enviarComentario(){
    this.publicacaoService.adicionarComentario(this.dadosComentario)
    .subscribe(
      (data) => {
        this.listarPostagemEspecifica(this.idPostagem);
        // this.publicacaoService.detalhePostagem.comentarios.push(data);
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Comentário cadastrado com sucesso!',
          confirmButtonColor: '#118ab2'
        }).then(() => {
          this.formularioComentario.reset();
        })
    })
  }

  // *******************
  // Formulário Proposta
  // *******************

  inicializarFormularioProposta(){
    this.formularioProposta = this.formBuilder.group({
      valor: ['', Validators.required],
      comentario: ['', Validators.required]
    })
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
    let dadosProposta: Propostas;
    let idMentor = this.publicacaoService.usuario.id;
    let mentor: Mentor;

    mentor = {
      id: idMentor
    }

    dadosProposta = {
      comentario: this.formularioProposta.controls.comentario.value,
      valor: Number(this.formularioProposta.controls.valor.value),
      mentor: mentor,
      postagem_id: this.idPostagem
    }

    this.enviarProposta(dadosProposta);
  }

  enviarProposta(dadosProposta: Propostas){
    this.publicacaoService.cadastrarProposta(dadosProposta)
    .subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Proposta enviada com sucesso!',
          confirmButtonColor: '#118ab2'
        })
        this.listarPostagemEspecifica(this.idPostagem);
        this.formularioProposta.reset();
    })
  }

  // ****
  // Etc
  // ****

  listarPostagemEspecifica(id: number){
    this.publicacaoService.listarPostagemEspecifica(id)
    .subscribe(
      (data: Postagem) => {
        this.postagemEspecifica = data;
    })
  }

    // ******** Pega dados do usuário ********
  pegarDadosUsuario(){
    let email = localStorage.getItem('email');

    this.publicacaoService.dadosUsuario(email).subscribe(
      (data) => {
        this.publicacaoService.usuario = data;
    })
  }

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

  mascaraDecimalValor(i: number) {

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL' 
    });

    const formatted = formatter.format(i);
    return formatted;
  }

}
