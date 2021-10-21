import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Usuario } from 'src/app/modules/usuario/shared/usuario';
import { DevsService } from '../../shared/devs.service';
import { DevPerfilDetalheComponent } from '../dev-perfil-detalhe/dev-perfil-detalhe.component';

@Component({
  selector: 'app-dev-perfil',
  templateUrl: './dev-perfil.component.html',
  styleUrls: ['./dev-perfil.component.scss']
})
export class DevPerfilComponent implements OnInit {

  bsModalRef?: BsModalRef;
  usuarioEspecifico: Usuario = this.devsService.usuarioEspecifico;
  validaUsuario: boolean = false;

  constructor(private modalService: BsModalService, private devsService: DevsService) { }

  ngOnInit(): void {
    { this.usuarioEspecifico != undefined ? [ this.validaUsuario = true ] : [this.validaUsuario = false ]} 
    console.log(this.usuarioEspecifico);
  }

  add(fArea) {
    this.bsModalRef = this.modalService.show(DevPerfilDetalheComponent);
    this.bsModalRef.content.area = fArea;
  }

  abrirRedeSocial(tipo: number){
    { tipo == 1 ? [window.open(this.usuarioEspecifico.linkedin)] : [window.open(this.usuarioEspecifico.github)]};
  }

}
