import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dev-perfil-detalhe',
  templateUrl: './dev-perfil-detalhe.component.html',
  styleUrls: ['./dev-perfil-detalhe.component.scss']
})
export class DevPerfilDetalheComponent implements OnInit {

  @Input() area: string;
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  onClose() {
    this.bsModalRef.hide()
  }

}
