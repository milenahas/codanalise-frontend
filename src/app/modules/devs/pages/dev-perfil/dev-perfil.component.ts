import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DevPerfilDetalheComponent } from '../dev-perfil-detalhe/dev-perfil-detalhe.component';

@Component({
  selector: 'app-dev-perfil',
  templateUrl: './dev-perfil.component.html',
  styleUrls: ['./dev-perfil.component.scss']
})
export class DevPerfilComponent implements OnInit {

  bsModalRef?: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  add(fArea) {
    this.bsModalRef = this.modalService.show(DevPerfilDetalheComponent);
    this.bsModalRef.content.area = fArea;
  }

}
