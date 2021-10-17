import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = "https://codanalisebeta.herokuapp.com";

  constructor(private http: HttpClient) { }

  cadastrar(dados: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(`${this.url}/usuario`, dados);
  }

  login(email: string): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.url}/usuario/login/${email}`);
  }


}
