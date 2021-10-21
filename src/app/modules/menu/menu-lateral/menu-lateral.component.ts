import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthguardService } from 'src/app/config/guards/authguard.service';
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

  constructor(private rota: Router, private menuService: MenuService) { }

  ngOnInit(): void {
    this.pegarDadosUsuarioEspecifico();
    console.log(this.usuario);
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
        console.log(this.usuario);
      },
      error: err => console.log('Erro', err)
    }).add(() => {
      this.loadingMenu = false;
    })
  }

}
