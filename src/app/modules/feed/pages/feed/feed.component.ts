import { Component, OnChanges, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Postagem } from '../../shared/postagem';
import { PublicacaoService } from '../../shared/publicacao.service';
import { CriarPublicacaoComponent } from '../criar-publicacao/criar-publicacao.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  email = localStorage.getItem('email');
  getDark: string = localStorage.getItem('dark');

  loading: boolean = false;

  bsModalRef?: BsModalRef;
  config = {
    keyboard: false,
    ignoreBackdropClick: true
  };

  constructor(private modalService: BsModalService, public publicacaoService: PublicacaoService) { }

  ngOnInit(): void {
    this.listarPostagens();
    this.pegarDadosUsuario();
  }

  // ******** Pega dados do usuário ********
  pegarDadosUsuario(){
    this.publicacaoService.dadosUsuario(this.email).subscribe(
      (data) => {
        this.publicacaoService.usuario = data;
    })
  }

  add() {
    this.bsModalRef = this.modalService.show(CriarPublicacaoComponent, this.config);
    //this.bsModalRef.content.area = fArea;
  }

  listarPostagens(value?){
    this.loading = true;
    
    if(value){
      this.publicacaoService.listagemTagNome(value)
      .subscribe(
        (data) => {
          this.publicacaoService.postagem = data;
      }).add(() => {
        this.loading = false;
      })
    }else if (value === undefined || value === ''){
      this.publicacaoService.listarPostagens()
      .subscribe(
        (data) => {
          this.publicacaoService.postagem = data;
      }).add(() => {
        this.loading = false;
      })
    }
  }

  // ******************
  // Detalhe publicação
  // ******************

  dadosDetalhePublicacao(index){
    let idPostagem = String(this.publicacaoService.postagem[index].id);
    localStorage.setItem('idPostagem', idPostagem);

    // this.publicacaoService.idPostagem = this.publicacaoService.postagem[index].id;
    this.publicacaoService.detalhePostagem = this.publicacaoService.postagem[index];
  }
    
}
