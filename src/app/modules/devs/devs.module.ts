import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevsRoutingModule } from './devs-routing.module';
import { DevsComponent } from './pages/devs/devs.component';
import { DevPerfilComponent } from './pages/dev-perfil/dev-perfil.component';
import { DevPerfilDetalheComponent } from './pages/dev-perfil-detalhe/dev-perfil-detalhe.component';
import { DevsListagemComponent } from './components/devs-listagem/devs-listagem.component';


@NgModule({
  declarations: [
    DevsComponent,
    DevPerfilComponent,
    DevPerfilDetalheComponent,
    DevsListagemComponent
  ],
  imports: [
    CommonModule,
    DevsRoutingModule
  ]
})
export class DevsModule { }
