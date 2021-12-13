import { Component, OnInit } from '@angular/core';
import { Postagem } from 'src/app/modules/feed/shared/postagem';
import { HistoricoService } from '../../shared/historico.service';

@Component({
  selector: 'app-minhas-publicacoes',
  templateUrl: './minhas-publicacoes.component.html',
  styleUrls: ['./minhas-publicacoes.component.scss']
})
export class MinhasPublicacoesComponent implements OnInit {

  publicacoes: Postagem[] = [];
  
  getDark: string = localStorage.getItem('dark');

  constructor(private historicoService: HistoricoService) { }

  ngOnInit(): void {
    this.listarPublicacoesUsuarioEspecifico();
  }
  
  listarPublicacoesUsuarioEspecifico(){
    let idUsuario = Number(localStorage.getItem('id'));

    this.historicoService.listarPublicacoesUsuarioEspecifico(idUsuario).subscribe(
      (data) => {
        this.publicacoes = data;
    })
  }

  abrirDetalhePublicaca(id){
    localStorage.setItem('idPostagem', id);
  }

}
