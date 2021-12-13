import { Component, OnInit } from '@angular/core';
import { Aula } from '../../shared/aula';
import { HistoricoService } from '../../shared/historico.service';

@Component({
  selector: 'app-minhas-aulas',
  templateUrl: './minhas-aulas.component.html',
  styleUrls: ['./minhas-aulas.component.scss']
})
export class MinhasAulasComponent implements OnInit {

  minhasAulas: Aula[] = [];

  getDark: string = localStorage.getItem('dark');

  constructor(private historicoService: HistoricoService) { }

  ngOnInit(): void {
    this.listarMinhasAulas();
  }

  listarMinhasAulas(){
    let idUsuario = Number(localStorage.getItem('id'));

    this.historicoService.listarMinhasAulas(idUsuario)
    .subscribe(
      (data) => {
        this.minhasAulas = data;
    })
  }

  mascaraDecimalValor(i: number) {

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL' 
    });

    const formatted = formatter.format(i);
    return formatted;
  }

}
