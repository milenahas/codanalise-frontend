import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Postagem } from 'src/app/modules/feed/shared/postagem';
import { Usuario } from 'src/app/modules/usuario/shared/usuario';
import { DevsService } from '../../shared/devs.service';

@Component({
  selector: 'app-dev-perfil',
  templateUrl: './dev-perfil.component.html',
  styleUrls: ['./dev-perfil.component.scss']
})
export class DevPerfilComponent implements OnInit {

  usuario: Usuario;
  postagem: Postagem;
  validaUsuario: boolean = false;
  getDark: string = localStorage.getItem('dark');

  loading: boolean = false;

  constructor(
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
      this.listarPostagens(data.id);
    })
  }

  listarPostagens(id) {
    this.devsService.listarPostagens(id)
      .subscribe(
        (data: Postagem) => {
          this.postagem = data;
          console.log(data)
      }).add(() => {
        this.loading = false;
      })
  }

  abrirRedeSocial(tipo: number){
    { tipo == 1 ? [window.open(this.usuario.linkedin)] : [window.open(this.usuario.github)]};
  }

}
