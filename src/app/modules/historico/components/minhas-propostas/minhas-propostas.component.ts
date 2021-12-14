import { Component, OnInit } from '@angular/core';
import { Propostas } from 'src/app/modules/feed/shared/propostas';
import { HistoricoService } from '../../shared/historico.service';

@Component({
  selector: 'app-minhas-propostas',
  templateUrl: './minhas-propostas.component.html',
  styleUrls: ['./minhas-propostas.component.scss']
})
export class MinhasPropostasComponent implements OnInit {

  getDark: string = localStorage.getItem('dark');
  propostas: Propostas[] = [];

  constructor(public historicoService: HistoricoService) { }

  ngOnInit(): void {
    this.getMentor();
  }

  getMentor() {
    let idUsuario = +(localStorage.getItem('id'));

    this.historicoService.getMentor(idUsuario).subscribe(
      (data) => {
        this.getProposta(data.id);
    })
  }

  getProposta(id:number) {
    this.historicoService.getProposta(id).subscribe(
      (data) =>{
        this.propostas = data;
        this.converte(data);
      })
  }

  converte(data) {
    for(let i = 0; i < data.length; i++){
      this.propostas[i].valor = data[i].valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
      //this.verificaStatus(this.propostas[i].postagem_id, data)
    }
  }

  /*For fun
  verificaStatus(id: number, proposta) {
    this.historicoService.listarPostagemEspecifica(id).subscribe(
      (data) => {
        console.log(data)
        if(data.estado === 'ABERTO') {
          for(let i = 0; i < proposta.length; i++){
            this.propostas[i].estado = 'Andamento';
          }
        }else if(data.estado === 'RESOLVIDO') {
          for(let i = 0; i < proposta.length; i++){
            this.propostas[i].estado = 'Recusado';
          }
        }
    })
  }*/
}
