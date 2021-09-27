import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatosComponent } from './pages/contatos/contatos.component';
import { SeguidoresComponent } from './pages/seguidores/seguidores.component';
import { SeguindoComponent } from './pages/seguindo/seguindo.component';

const routes: Routes = [
  {path: '', component: ContatosComponent, children: [
    {path: 'seguidores', component: SeguidoresComponent},
    {path: 'seguindo', component: SeguindoComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContatosRoutingModule { }
