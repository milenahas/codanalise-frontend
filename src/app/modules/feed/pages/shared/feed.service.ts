import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Publicacao } from './publicacao';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private url: string = "https://codanalisebeta.herokuapp.com";

  constructor(private http: HttpClient) { }

  cadastrarPublicacao(dados: Publicacao): Observable<any>{
    return this.http.post<any>(`${this.url}/postagem`, dados)
  }
}
