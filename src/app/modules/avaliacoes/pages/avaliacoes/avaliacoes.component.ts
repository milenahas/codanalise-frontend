import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avaliacoes',
  templateUrl: './avaliacoes.component.html',
  styleUrls: ['./avaliacoes.component.scss']
})
export class AvaliacoesComponent implements OnInit {

  getDark: string = localStorage.getItem('dark');

  constructor() { }

  ngOnInit(): void {
  }

}
