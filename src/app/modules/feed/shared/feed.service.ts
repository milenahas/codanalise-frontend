import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private url: string = "https://codanalisebeta.herokuapp.com";

  constructor() { }
}
