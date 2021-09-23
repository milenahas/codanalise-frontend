import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormModalComponent } from '../../shared/form-modal/form-modal.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  bsModalRef?: BsModalRef;
  isEdit: boolean = false;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  add(fArea) {
    this.bsModalRef = this.modalService.show(FormModalComponent);
    this.bsModalRef.content.area = fArea;
  }

  editar() {
    this.isEdit = !this.isEdit;
  }

  salvar() {
    this.isEdit = !this.isEdit;
  }

  cancelar() {
    this.isEdit = !this.isEdit;
  }

}
