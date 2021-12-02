import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExperienciaComponent } from './pages/form-modal/experiencia/experiencia.component';
import { SobreComponent } from './pages/form-modal/sobre/sobre.component';
import { LinguagemComponent } from './pages/form-modal/linguagem/linguagem.component';
import { EscolaridadeComponent } from './pages/form-modal/escolaridade/escolaridade.component';


@NgModule({
  declarations: [
    PerfilComponent,
    ExperienciaComponent,
    SobreComponent,
    LinguagemComponent,
    EscolaridadeComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PerfilModule { }
