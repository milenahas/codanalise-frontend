import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modules/usuario/shared/usuario';
import { DevsService } from '../../shared/devs.service';

@Component({
  selector: 'app-devs',
  templateUrl: './devs.component.html',
  styleUrls: ['./devs.component.scss']
})
export class DevsComponent implements OnInit {

  usuario: Usuario;

  validaLogin: string = localStorage.getItem('login');

  loading: boolean = false;

  constructor(private devsService: DevsService) { }

  ngOnInit(): void {
    this.validarLogin();
    this.listarMentores();
  }

  validarLogin(){
    if (this.validaLogin === 'true'){
      return true;
    }
  }

  listarMentores(){
    this.loading = true;

    this.devsService.listarUsuarios()
    .subscribe(
      (data: Usuario) => {
        this.usuario = data;
    }).add(() => {
      this.loading = false;
    })
  }

}
