import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './pages/feed/feed.component';
import { CriarPublicacaoComponent } from './components/criar-publicacao/criar-publicacao.component';
import { DetalhePublicacaoComponent } from './pages/detalhe-publicacao/detalhe-publicacao.component';


@NgModule({
  declarations: [
    FeedComponent,
    CriarPublicacaoComponent,
    DetalhePublicacaoComponent
  ],
  imports: [
    CommonModule,
    FeedRoutingModule
  ]
})
export class FeedModule { }
