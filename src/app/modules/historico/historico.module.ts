import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoricoRoutingModule } from './historico-routing.module';
import { HistoricoComponent } from './pages/historico/historico.component';
import { HistoricoDetalheComponent } from './pages/historico-detalhe/historico-detalhe.component';
import { MinhasAulasComponent } from './components/minhas-aulas/minhas-aulas.component';
import { MinhasPropostasComponent } from './components/minhas-propostas/minhas-propostas.component';
import { MinhasPublicacoesComponent } from './components/minhas-publicacoes/minhas-publicacoes.component';
import { DetalhePublicacaoComponent } from './components/minhas-publicacoes/detalhe-publicacao/detalhe-publicacao.component';
import { PagamentoComponent } from './components/minhas-publicacoes/pagamento/pagamento.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    HistoricoComponent,
    HistoricoDetalheComponent,
    MinhasAulasComponent,
    MinhasPropostasComponent,
    MinhasPublicacoesComponent,
    DetalhePublicacaoComponent,
    PagamentoComponent
  ],
  imports: [
    CommonModule,
    HistoricoRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ]
})
export class HistoricoModule { }
