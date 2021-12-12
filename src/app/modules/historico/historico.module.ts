import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoricoRoutingModule } from './historico-routing.module';
import { HistoricoComponent } from './pages/historico/historico.component';
import { HistoricoDetalheComponent } from './pages/historico-detalhe/historico-detalhe.component';
import { MinhasAulasComponent } from './components/minhas-aulas/minhas-aulas.component';
import { MinhasPropostasComponent } from './components/minhas-propostas/minhas-propostas.component';
import { MinhasPublicacoesComponent } from './components/minhas-publicacoes/minhas-publicacoes.component';


@NgModule({
  declarations: [
    HistoricoComponent,
    HistoricoDetalheComponent,
    MinhasAulasComponent,
    MinhasPropostasComponent,
    MinhasPublicacoesComponent
  ],
  imports: [
    CommonModule,
    HistoricoRoutingModule
  ]
})
export class HistoricoModule { }
