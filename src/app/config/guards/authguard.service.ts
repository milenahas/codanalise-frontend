import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor() { }

  validaLogar(){
    let login = localStorage.getItem('login');
    if (login === "" || login === null){
      return false
    } else {
      return true
    }
  }


}
