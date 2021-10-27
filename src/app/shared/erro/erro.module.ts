import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErroRoutingModule } from './erro-routing.module';
import { ErroComponent } from './erro/erro.component';


@NgModule({
  declarations: [
    ErroComponent
  ],
  imports: [
    CommonModule,
    ErroRoutingModule
  ]
})
export class ErroModule { }
