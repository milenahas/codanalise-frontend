import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../usuario/shared/usuario';
import { Comentarios } from './comentarios';
import { Linguagens } from './linguagens';
import { Mentor } from './mentor';
import { Postagem } from './postagem';
import { Propostas } from './propostas';

@Injectable({
  providedIn: 'root'
})
export class PublicacaoService {

  // Postagem
  postagem: Postagem[] = [];;
  idPostagem: number;

  // Detalhe postagem
  detalhePostagem: Postagem;

  // Comentários
  comentarios: Comentarios[] = [];

  // Usuário
  usuario: Usuario;

  private url: string = "https://codanalisebeta.herokuapp.com";

  constructor(private http: HttpClient) { }

  // Pega os dados do usuário que está fazendo a publicação 
  dadosUsuario(email: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}/usuario/login/${email}`);
  }

  getLinguagens() {
    return this.http.get<Linguagens>('../../../../assets/dados/linguagens.json').pipe();
  }

  dadosMentor(id: number): Observable<Mentor> {
    return this.http.get<Mentor>(`${this.url}/mentor/consulta/${id}`);
  }
  
  // ***************************
  // ******** Postagens ********
  // ***************************

  listarPostagens(): Observable<Postagem[]>{
    return this.http.get<Postagem[]>(`${this.url}/postagem`);
  }

  cadastrarPostagem(dados: Postagem): Observable<Postagem>{
    return this.http.post<Postagem>(`${this.url}/postagem`, dados);
  }

  listarPostagemEspecifica(id: number): Observable<Postagem>{
    return this.http.get<Postagem>(`${this.url}/postagem/${id}`);
  }

  listagemTagNome(value: string): Observable<Postagem[]>{
    return this.http.get<Postagem[]>(`${this.url}/postagem/busca/${value}`);
  }

  // *****************************
  // ******** Comentários ********
  // *****************************

  adicionarComentario(dados: Comentarios): Observable<Comentarios>{
    return this.http.post<Comentarios>(`${this.url}/com`, dados);
  }

  listarComentarios(): Observable<Comentarios[]>{
    return this.http.get<Comentarios[]>(`${this.url}/com`);
  }

  // *****************************
  // ******** Propostas ********
  // *****************************
  cadastrarProposta(dados: Propostas): Observable<Propostas>{
    return this.http.post<Propostas>(`${this.url}/proposta`, dados)
  }
}
