import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mentor } from '../../feed/shared/mentor';
import { Carteira } from './carteira';

@Injectable({
  providedIn: 'root'
})
export class CarteiraService {

  private url: string = "https://codanalisebeta.herokuapp.com";


  constructor(private http: HttpClient) { }

  getCarteira(): Observable<Carteira[]> {
    return this.http.get<Carteira[]>(`${this.url}/carteira`);
  }

  getMentor(id: number): Observable<Mentor> {
    return this.http.get<Mentor>(`${this.url}/mentor/consulta/${id}`);
  }
}
