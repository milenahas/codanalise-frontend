import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastroComponent } from './pages/cadastro/cadastro.component';


@NgModule({
  declarations: [
    LoginComponent,
    CadastroComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsuarioModule { }
