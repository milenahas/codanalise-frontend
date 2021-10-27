import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private rota: Router) { }

  retornoErro(erro){
    if (erro.error){
      if (erro.status == 401){
        Swal.fire(
          'Sucesso!',
          erro.error,
          'success'
        ).then((result) => {
          this.rota.navigate(["/usuario/login"]);
        })
      } else if (erro.status == 400){
        Swal.fire(
          'Sucesso!',
          erro.error.errors[0].message,
          'success'
        ).then((result) => {
          //
        })
      } else {
        this.rota.navigate(["erro"]);
      }

    } else {
      Swal.fire(
        'Sucesso!',
        'Verifique sua conexão.',
        'success'
      ).then((result) => {
        this.rota.navigate(["/home"]);
      })
    }
  }
}
