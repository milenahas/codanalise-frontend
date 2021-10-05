import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './pages/feed/feed.component';
import { CriarPublicacaoComponent } from './pages/criar-publicacao/criar-publicacao.component';
import { DetalhePublicacaoComponent } from './pages/detalhe-publicacao/detalhe-publicacao.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    FeedComponent,
    CriarPublicacaoComponent,
    DetalhePublicacaoComponent
  ],
  imports: [
    CommonModule,
    FeedRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class FeedModule { }
