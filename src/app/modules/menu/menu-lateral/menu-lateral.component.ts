import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthguardService } from 'src/app/config/guards/authguard.service';
import { DevsService } from '../../devs/shared/devs.service';
import { Usuario } from '../../usuario/shared/usuario';
import { MenuService } from '../shared/menu.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit {

  email: string = localStorage.getItem('email');

  usuario: Usuario;

  loadingMenu: boolean = false;

  constructor(private rota: Router, private menuService: MenuService, private devsService: DevsService) { }

  ngOnInit(): void {
    this.pegarDadosUsuarioEspecifico();
  }

  sair(){
    localStorage.clear();
    this.rota.navigate(['/login']);
  }

  pegarDadosUsuarioEspecifico(){
    this.loadingMenu = true;
    this.menuService.usuarioEspecifico(this.email).subscribe({
      next: (data) => {
        this.usuario = data;
      },
      error: err => console.log('Erro', err)
    }).add(() => {
      this.loadingMenu = false;
    })
  }

  acessarPerfil(){
    this.devsService.usuarioEspecifico = this.usuario;
    this.rota.navigate(['/devs/dev-perfil']);
  }

}
