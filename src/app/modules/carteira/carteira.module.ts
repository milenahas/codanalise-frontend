import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarteiraRoutingModule } from './carteira-routing.module';
import { CarteiraComponent } from './pages/carteira/carteira.component';


@NgModule({
  declarations: [
    CarteiraComponent
  ],
  imports: [
    CommonModule,
    CarteiraRoutingModule
  ]
})
export class CarteiraModule { }
