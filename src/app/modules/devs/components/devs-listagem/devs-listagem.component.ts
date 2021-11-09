import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modules/usuario/shared/usuario';
import { DevsService } from '../../shared/devs.service';

@Component({
  selector: 'app-devs-listagem',
  templateUrl: './devs-listagem.component.html',
  styleUrls: ['./devs-listagem.component.scss']
})
export class DevsListagemComponent implements OnInit {

  @Input() usuario: Usuario;

  constructor(private devsService: DevsService) { }

  ngOnInit(): void {
  }

  abrirPerfil(index: number){
    this.devsService.usuarioEspecifico = this.usuario[index];
  }

}
