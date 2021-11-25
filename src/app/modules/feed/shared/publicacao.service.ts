import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Linguagens } from './linguagens';

@Injectable({
  providedIn: 'root'
})
export class PublicacaoService {

  constructor(private http: HttpClient) { }

  getLinguagens() {
    return this.http.get<Linguagens>('../../../../assets/dados/linguagens.json').pipe();
  }
}
