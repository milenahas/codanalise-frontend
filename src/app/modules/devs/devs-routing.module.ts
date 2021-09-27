import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevPerfilComponent } from './pages/dev-perfil/dev-perfil.component';
import { DevsComponent } from './pages/devs/devs.component';

const routes: Routes = [
  { path: '', component: DevsComponent },
  { path: 'dev-perfil', component: DevPerfilComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevsRoutingModule { }
