import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mentor } from '../../feed/shared/mentor';
import { Postagem } from '../../feed/shared/postagem';
import { Aula } from './aula';
import { Propostas } from '../../feed/shared/propostas';
import { Pagamento } from './pagamento';
import { Usuario } from '../../usuario/shared/usuario';

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

  listarUsuarioEspecifico(email: string): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.url}/usuario/login/${email}`);
  }

  pagar(dadosPagamento: Pagamento): Observable<Pagamento>{
    return this.http.post<Pagamento>(`${this.url}/pagamento`, dadosPagamento);
  }

  getProposta(id: number): Observable<Propostas[]> {
    return this.http.get<Propostas[]>(`${this.url}/proposta/busca/${id}`);
  }

  getMentor(id: number): Observable<Mentor> {
    return this.http.get<Mentor>(`${this.url}/mentor/consulta/${id}`);
  }

  // Minhas aulas
  listarMinhasAulasUsuario(id: number): Observable<Aula[]>{
    return this.http.get<Aula[]>(`${this.url}/aula/aluno/${id}`)
  }

  listarMinhasAulasMentor(id: number): Observable<Aula[]>{
    return this.http.get<Aula[]>(`${this.url}/aula/mentor/${id}`);
  }

  atualizaAula(dados: Aula): Observable<Aula>{
    return this.http.put<Aula>(`${this.url}/aula`, dados);
  }
}
