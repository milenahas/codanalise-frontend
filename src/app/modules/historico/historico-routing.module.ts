import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoricoDetalheComponent } from './pages/historico-detalhe/historico-detalhe.component';
import { HistoricoComponent } from './pages/historico/historico.component';

const routes: Routes = [
  { path: 'historico-detalhe', component: HistoricoDetalheComponent},
  { path: '', component: HistoricoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoricoRoutingModule { }
