import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from 'src/app/config/guards/authguard.guard';
import { ErroComponent } from './erro/erro.component';

const routes: Routes = [
  { path: 'erro', component: ErroComponent, canActivate: [AuthguardGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErroRoutingModule { }
