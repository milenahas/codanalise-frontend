import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalhe-publicacao',
  templateUrl: './detalhe-publicacao.component.html',
  styleUrls: ['./detalhe-publicacao.component.scss']
})
export class DetalhePublicacaoComponent implements OnInit {

  isFavourite: boolean = false;
  comentar: boolean = false;
  propor: boolean = false

  constructor() { }

  ngOnInit(): void {
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

}
