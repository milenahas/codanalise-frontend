import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../usuario/shared/usuario';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private url: string = "https://codanalisebeta.herokuapp.com";

  constructor(private http: HttpClient) { }

  usuarioEspecifico(email: string): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.url}/usuario/login/${email}`);
  }
}
