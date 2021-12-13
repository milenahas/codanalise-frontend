import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Postagem } from '../../feed/shared/postagem';
import { Usuario } from '../../usuario/shared/usuario';

@Injectable({
  providedIn: 'root'
})
export class DevsService {

  usuarioEspecifico: Usuario;

  private url: string = "https://codanalisebeta.herokuapp.com";

  constructor(private http: HttpClient) { }

  listarUsuarios(): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.url}/usuario`);
  }

  atualizarUsuario(dados: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.url}/usuario`, dados);
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}/usuario/${id}`);
  }

  filtrarNomeTag(value: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}/usuario/nomeoutag/${value}`);
  }

  listarPostagens(id: number): Observable<Postagem> {
    return this.http.get<Postagem>(`${this.url}/postagem/usuario/${id}`);
  }
}
