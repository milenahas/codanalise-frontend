import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-devs',
  templateUrl: './devs.component.html',
  styleUrls: ['./devs.component.scss']
})
export class DevsComponent implements OnInit {

  validaLogin: string = localStorage.getItem('login');

  constructor() { }

  ngOnInit(): void {
    this.validarLogin()
  }

  validarLogin(){
    console.log(this.validaLogin)
    if (this.validaLogin === 'true'){
      return true;
    }
  }

}
