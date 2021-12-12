import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carteira',
  templateUrl: './carteira.component.html',
  styleUrls: ['./carteira.component.scss']
})
export class CarteiraComponent implements OnInit {

  getDark: string = localStorage.getItem('dark');

  constructor() { }

  ngOnInit(): void {
  }

}
