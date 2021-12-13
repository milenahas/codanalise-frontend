import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/modules/usuario/shared/usuario';

@Component({
  selector: 'app-devs-listagem',
  templateUrl: './devs-listagem.component.html',
  styleUrls: ['./devs-listagem.component.scss']
})
export class DevsListagemComponent implements OnInit {

  @Input() usuario: Usuario;
  @Output() pesquisaEvent = new EventEmitter<string>();
  getDark: string = localStorage.getItem('dark');

  constructor() { }

  ngOnInit(): void {
  }

  filtrarPorNomeTag(valor: string) {
    this.pesquisaEvent.emit(valor);
  }
}

