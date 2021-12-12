import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-minhas-aulas',
  templateUrl: './minhas-aulas.component.html',
  styleUrls: ['./minhas-aulas.component.scss']
})
export class MinhasAulasComponent implements OnInit {

  getDark: string = localStorage.getItem('dark');

  constructor() { }

  ngOnInit(): void {
  }

}
