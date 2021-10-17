import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../usuario/shared/usuario.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private rota: Router) { }

  ngOnInit(): void {
  }

  // deslogar(){
  //   this.usuarioService.mostrarMenu.emit(false);
  //   this.rota.navigate(['/login']);
  // }

}
