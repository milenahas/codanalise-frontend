import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalhePublicacaoComponent } from './pages/detalhe-publicacao/detalhe-publicacao.component';
import { FeedComponent } from './pages/feed/feed.component';

const routes: Routes = [
  { path: '', component: FeedComponent},
  {path: 'detalhe-publicacao', component: DetalhePublicacaoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedRoutingModule { }
