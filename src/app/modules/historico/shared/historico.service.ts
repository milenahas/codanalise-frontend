import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Postagem } from '../../feed/shared/postagem';
import { Aula } from './aula';
import { Pagamento } from './pagamento';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {

  private url: string = "https://codanalisebeta.herokuapp.com";

  constructor(private http: HttpClient) { }

  listarPublicacoesUsuarioEspecifico(id: number): Observable<Postagem[]>{
    return this.http.get<Postagem[]>(`${this.url}/postagem/usuario/${id}`);
  }

  listarPostagemEspecifica(idPostagem: number): Observable<Postagem>{
    return this.http.get<Postagem>(`${this.url}/postagem/${idPostagem}`);
  }

  pagar(dadosPagamento: Pagamento): Observable<Pagamento>{
    return this.http.post<Pagamento>(`${this.url}/pagamento`, dadosPagamento)
  }

  // Minhas aulas
  listarMinhasAulas(id: number): Observable<Aula[]>{
    return this.http.get<Aula[]>(`${this.url}/aula/aluno/${id}`)
  }
}
