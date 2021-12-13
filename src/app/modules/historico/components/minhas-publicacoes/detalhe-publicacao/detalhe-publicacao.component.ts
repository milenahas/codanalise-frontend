import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Postagem } from 'src/app/modules/feed/shared/postagem';
import { Propostas } from 'src/app/modules/feed/shared/propostas';
import { PagamentoComponent } from 'src/app/modules/pagamento/pages/pagamento/pagamento.component';
import { HistoricoService } from '../../../shared/historico.service';

@Component({
  selector: 'app-detalhe-publicacao',
  templateUrl: './detalhe-publicacao.component.html',
  styleUrls: ['./detalhe-publicacao.component.scss']
})
export class DetalhePublicacaoComponent implements OnInit {

  publicacao: Postagem;
  proposta: Propostas;

  isFavourite: boolean = false;
  comentar: boolean = true;
  propor: boolean = false;
  bsModalRef?: BsModalRef;
  getDark: string = localStorage.getItem('dark');

  constructor(private modalService: BsModalService, private historicoService: HistoricoService) { }

  ngOnInit(): void {
    this.listarPublicaca();
  }

  favourite() {
    this.isFavourite = !this.isFavourite;
  }

  comentarios() {
    this.comentar = !this.comentar;
    this.propor = false;
  }

  propostas() {
    this.propor = !this.propor;
    this.comentar = false;
  }

  aceitar() {
    this.bsModalRef = this.modalService.show(PagamentoComponent);
  }

  listarPublicaca(){
    let idPostagem = Number(localStorage.getItem('idPostagem'));

    this.historicoService.listarPostagemEspecifica(idPostagem)
    .subscribe(
      (data) => {
        this.publicacao = data;
    })
  }

  mascaraDecimalValor(i: number) {

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL' 
    });

    const formatted = formatter.format(i);
    return formatted;
  }

  abrirPagamento(index){
    this.proposta = this.publicacao.propostas[index];
  }

}
