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
  getDark: string = localStorage.getItem('dark');

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

  listarMentores(value?){
    this.loading = true;

    if(value){
      this.devsService.filtrarNomeTag(value)
      .subscribe(
        (data: Usuario) => {
          this.usuario = data;
      }).add(() => {
        this.loading = false;
      })
    }else if(value === undefined || value === '') {
      this.devsService.listarUsuarios()
      .subscribe(
        (data: Usuario) => {
          this.usuario = data;
      }).add(() => {
        this.loading = false;
      })
    }
    
  }

}
