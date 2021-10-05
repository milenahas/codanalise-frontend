import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Publicacao } from '../../shared/publicacao';
import { CriarPublicacaoComponent } from '../criar-publicacao/criar-publicacao.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  bsModalRef?: BsModalRef;

  publicacoes: Publicacao[] = [];

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    this.publicacoes = [
      {
        id: 1,
        titulo: 'Code Review',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun ut labore et dolore magna aliqua.',
        valor: '100,00',
        arquivo: 'teste.js',
        linguagens: 'JavaScript'
      }
    ]
  }

  add() {
    this.bsModalRef = this.modalService.show(CriarPublicacaoComponent);
    //this.bsModalRef.content.area = fArea;
  }

}
