import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { FormModalComponent } from './shared/form-modal/form-modal.component';


@NgModule({
  declarations: [
    PerfilComponent,
    FormModalComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule
  ]
})
export class PerfilModule { }
