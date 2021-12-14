import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mentor } from '../../feed/shared/mentor';
import { Postagem } from '../../feed/shared/postagem';
import { Propostas } from '../../feed/shared/propostas';
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
    return this.http.post<Pagamento>(`${this.url}/pagamento`, dadosPagamento);
  }

  getProposta(id: number): Observable<Propostas> {
    return this.http.get<Propostas>(`${this.url}/proposta/busca/${id}`);
  }

  getMentor(id: number): Observable<Mentor> {
    return this.http.get<Mentor>(`${this.url}/mentor/consulta/${id}`);
  }
}
