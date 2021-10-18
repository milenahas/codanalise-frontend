import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthguardService } from 'src/app/config/guards/authguard.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit {

  constructor(private rota: Router, private authGuardService: AuthguardService) { }

  ngOnInit(): void {
  }

  sair(){
    localStorage.clear();
    this.rota.navigate(['/login']);
  }

}
