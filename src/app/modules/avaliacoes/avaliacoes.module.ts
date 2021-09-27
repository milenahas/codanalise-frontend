import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvaliacoesRoutingModule } from './avaliacoes-routing.module';
import { AvaliacoesComponent } from './pages/avaliacoes/avaliacoes.component';


@NgModule({
  declarations: [
    AvaliacoesComponent
  ],
  imports: [
    CommonModule,
    AvaliacoesRoutingModule
  ]
})
export class AvaliacoesModule { }
