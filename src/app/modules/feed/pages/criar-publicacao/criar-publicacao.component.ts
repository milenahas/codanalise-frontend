import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-criar-publicacao',
  templateUrl: './criar-publicacao.component.html',
  styleUrls: ['./criar-publicacao.component.scss']
})
export class CriarPublicacaoComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  onClose() {
    this.bsModalRef.hide()
  }

}
