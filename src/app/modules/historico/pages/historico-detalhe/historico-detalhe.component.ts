import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historico-detalhe',
  templateUrl: './historico-detalhe.component.html',
  styleUrls: ['./historico-detalhe.component.scss']
})
export class HistoricoDetalheComponent implements OnInit {

  isFavourite: boolean = false;
  comentar: boolean = true;
  propor: boolean = false;

  constructor() { }

  ngOnInit(): void {
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

}
