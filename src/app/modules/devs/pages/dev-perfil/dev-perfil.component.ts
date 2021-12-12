import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  usuario: Usuario;
  validaUsuario: boolean = false;
  getDark: string = localStorage.getItem('dark');

  constructor(
    private modalService: BsModalService,
    private devsService: DevsService,
    public route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getUsuario();
  }

  getUsuario() {
    let id = +this.route.snapshot.paramMap.get('id');

    this.devsService.getUsuario(id).subscribe( (data: Usuario) => {
      this.usuario = data;
      console.log(data)
    })
  }

  abrirRedeSocial(tipo: number){
    { tipo == 1 ? [window.open(this.usuario.linkedin)] : [window.open(this.usuario.github)]};
  }

  add(fArea) {
    this.bsModalRef = this.modalService.show(DevPerfilDetalheComponent);
    this.bsModalRef.content.area = fArea;
  }

}
