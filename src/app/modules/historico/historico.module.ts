import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoricoRoutingModule } from './historico-routing.module';
import { HistoricoComponent } from './pages/historico/historico.component';
import { HistoricoDetalheComponent } from './pages/historico-detalhe/historico-detalhe.component';


@NgModule({
  declarations: [
    HistoricoComponent,
    HistoricoDetalheComponent
  ],
  imports: [
    CommonModule,
    HistoricoRoutingModule
  ]
})
export class HistoricoModule { }
