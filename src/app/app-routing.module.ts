import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'feed', loadChildren: () => import('./modules/feed/feed.module').then(m => m.FeedModule) },
  { path: 'perfil', loadChildren: () => import('./modules/perfil/perfil.module').then(m => m.PerfilModule) },
  { path: 'carteira', loadChildren: () => import('./modules/carteira/carteira.module').then(m => m.CarteiraModule) },
  { path: 'devs', loadChildren: () => import('./modules/devs/devs.module').then(m => m.DevsModule) },
  { path: 'historico', loadChildren: () => import('./modules/historico/historico.module').then(m => m.HistoricoModule) },
  { path: 'contatos', loadChildren: () => import('./modules/contatos/contatos.module').then(m => m.ContatosModule) },
  { path: 'avaliacoes', loadChildren: () => import('./modules/avaliacoes/avaliacoes.module').then(m => m.AvaliacoesModule) },
  { path: 'usuario', loadChildren: () => import('./modules/usuario/usuario.module').then(m => m.UsuarioModule) },
  { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
