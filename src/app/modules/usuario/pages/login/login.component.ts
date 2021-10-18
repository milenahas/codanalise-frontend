import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthguardService } from 'src/app/config/guards/authguard.service';
import { Usuario } from '../../shared/usuario';
import { UsuarioService } from '../../shared/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  email: string;


  constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder, private myRoute: Router) { }

  ngOnInit(): void {
    localStorage.clear();
    this.inicializarForm();
  }

  inicializarForm(){
    this.formulario = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      senha: ['', Validators.compose([Validators.required])]
    })
  }

  validarFormulario(){
    if (this.formulario.invalid){
      Object.keys(this.formulario.controls).forEach(campo => {
        const controle = this.formulario.get(campo);
        controle.markAsDirty();
      });
    } else {
      this.login();
    }
  }

  login(){
    this.email = this.formulario.controls.email.value;
    this.usuarioService.login(this.email)
    .subscribe(
      (data: Usuario) => {
        if (data.senha === this.formulario.controls.senha.value){
          localStorage.setItem('login', 'true');
          this.myRoute.navigate(['/feed']);
          
        }
    },
    error => {
      alert("Dados não encontrados em nossa base de dados.");
      // this.usuarioService.mostrarMenu.emit(false);
    });
  };

    // ****************** VALIDAÇÕES ******************

    aplicaCssErro(campo) {
      return {
        'is-invalid': this.verificaTouched(campo) && !this.formulario.valid
      }
    }
  
    verificaTouched(campo) {
      return !this.formulario.get(campo).valid && this.formulario.get(campo).dirty;
    }


}
