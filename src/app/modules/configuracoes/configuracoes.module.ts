import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracoesRoutingModule } from './configuracoes-routing.module';
import { ConfiguracoesComponent } from './pages/configuracoes/configuracoes.component';
import { TornarMentorComponent } from './components/tornar-mentor/tornar-mentor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ConfiguracoesComponent,
    TornarMentorComponent
  ],
  imports: [
    CommonModule,
    ConfiguracoesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ConfiguracoesModule { }
