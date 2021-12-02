import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Linguagens } from '../../feed/shared/linguagens';
import { Experiencia } from '../../usuario/shared/experiencia';
import { Usuario } from '../../usuario/shared/usuario';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  public editarEmitter = new EventEmitter<number>();

  private url: string = "https://codanalisebeta.herokuapp.com";

  constructor(private http: HttpClient) { }

  usuarioEspecifico(email: string): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.url}/usuario/login/${email}`);
  }

  editarUsuario(dados: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.url}/usuario`, dados)
  }

  getLinguagens() {
    return this.http.get<Linguagens>('../../../../assets/dados/linguagens.json').pipe();
  }
}
