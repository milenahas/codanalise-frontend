import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-minhas-publicacoes',
  templateUrl: './minhas-publicacoes.component.html',
  styleUrls: ['./minhas-publicacoes.component.scss']
})
export class MinhasPublicacoesComponent implements OnInit {
  
  getDark: string = localStorage.getItem('dark');

  constructor() { }

  ngOnInit(): void {
  }

}
