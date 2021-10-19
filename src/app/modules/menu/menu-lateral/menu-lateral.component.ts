import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthguardService } from 'src/app/config/guards/authguard.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit {

  usuario: string = localStorage.getItem('nome') + " " + localStorage.getItem('sobrenome');

  constructor(private rota: Router, private authGuardService: AuthguardService) { }

  ngOnInit(): void {
    console.log(this.usuario);
  }

  sair(){
    localStorage.clear();
    this.rota.navigate(['/login']);
  }

}
