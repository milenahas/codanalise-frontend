import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-devs',
  templateUrl: './devs.component.html',
  styleUrls: ['./devs.component.scss']
})
export class DevsComponent implements OnInit {

  // validaLogin: string = localStorage.getItem('login');

  constructor() { }

  ngOnInit(): void {
  }

  validarLogin(){
    // if (this.validaLogin === 'true'){
    //   return true;
    // }
  }

}
