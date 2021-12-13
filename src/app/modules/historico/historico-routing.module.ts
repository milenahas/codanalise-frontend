import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalhePublicacaoComponent } from './components/minhas-publicacoes/detalhe-publicacao/detalhe-publicacao.component';
import { HistoricoDetalheComponent } from './pages/historico-detalhe/historico-detalhe.component';
import { HistoricoComponent } from './pages/historico/historico.component';

const routes: Routes = [
  { path: 'detalhe-publicacao', component: DetalhePublicacaoComponent},
  { path: '', component: HistoricoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoricoRoutingModule { }
