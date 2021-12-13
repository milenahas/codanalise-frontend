import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-historico-detalhe',
  templateUrl: './historico-detalhe.component.html',
  styleUrls: ['./historico-detalhe.component.scss']
})
export class HistoricoDetalheComponent implements OnInit {

  isFavourite: boolean = false;
  comentar: boolean = true;
  propor: boolean = false;
  bsModalRef?: BsModalRef;
  getDark: string = localStorage.getItem('dark');

  constructor(private modalService: BsModalService) { }

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
