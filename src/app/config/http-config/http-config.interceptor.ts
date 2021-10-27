import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { ErrorService } from '../error/error.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(private erroService: ErrorService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!/^(http|https):/i.test(request.url)) {
      request = request.clone({ url: environment.apiUrl + request.url });
    }

    request = this.validarSessao(request);

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let data = {};
        data = {
          reason: error && error.error && error.error.reason ? error.error.reason : '',
          status: error.status
        };

        this.erroService
      })

    );
  }

  validarSessao(request: HttpRequest<any>){
    let sessao = localStorage.getItem('sessao');

    if (sessao){
      request = request.clone({ headers: request.headers.set('Authorization', sessao) });
    }

    return request;

  }
}
