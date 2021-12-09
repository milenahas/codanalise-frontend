import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import '@fortawesome/fontawesome-free/js/all.js';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { HttpClientModule } from '@angular/common/http';
import { MenuTopoComponent } from './modules/menu/menu-topo/menu-topo.component';
import { MenuLateralComponent } from './modules/menu/menu-lateral/menu-lateral.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    MenuTopoComponent,
    MenuLateralComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    UsuarioModule,
    NgbModule,
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
