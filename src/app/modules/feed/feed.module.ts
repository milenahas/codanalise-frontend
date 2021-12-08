import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './pages/feed/feed.component';
import { CriarPublicacaoComponent } from './pages/criar-publicacao/criar-publicacao.component';
import { DetalhePublicacaoComponent } from './pages/detalhe-publicacao/detalhe-publicacao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';

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
    FormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
  ]
})
export class FeedModule { }