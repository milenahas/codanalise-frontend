import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContatosRoutingModule } from './contatos-routing.module';
import { ContatosComponent } from './pages/contatos/contatos.component';
import { SeguidoresComponent } from './pages/seguidores/seguidores.component';
import { SeguindoComponent } from './pages/seguindo/seguindo.component';


@NgModule({
  declarations: [
    ContatosComponent,
    SeguidoresComponent,
    SeguindoComponent
  ],
  imports: [
    CommonModule,
    ContatosRoutingModule
  ]
})
export class ContatosModule { }
