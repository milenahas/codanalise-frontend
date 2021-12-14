import { Component, OnInit } from '@angular/core';
import { Mentor } from 'src/app/modules/feed/shared/mentor';
import { Carteira } from '../../shared/carteira';
import { CarteiraService } from '../../shared/carteira.service';

@Component({
  selector: 'app-carteira',
  templateUrl: './carteira.component.html',
  styleUrls: ['./carteira.component.scss']
})
export class CarteiraComponent implements OnInit {

  getDark: string = localStorage.getItem('dark');
  carteira: Carteira;

  constructor(public carteiraService: CarteiraService) { }

  ngOnInit(): void {
    this.getMentor();
  }

  getMentor() {
    let idUsuario = +(localStorage.getItem('id'));

    this.carteiraService.getMentor(idUsuario).subscribe((data: Mentor) => {
      this.getCarteira(data.id)
    })
  }

  getCarteira(idMentor) {
    this.carteiraService.getCarteira().subscribe( (data: Carteira[]) => {
      for(let i = 0; i < data.length; i++) {
        if(data[i].mentor_id === idMentor) {
          this.carteira = data[i];
        }
      }
    }), erro => {
      console.log(erro)
    }
  }

  mascaraDecimalValor(i: number) {

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL' 
    });

    const formatted = formatter.format(i);
    return formatted;
  }

}
