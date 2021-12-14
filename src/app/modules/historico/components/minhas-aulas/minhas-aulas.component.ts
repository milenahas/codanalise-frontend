import { Component, OnInit } from '@angular/core';
import { Postagem } from 'src/app/modules/feed/shared/postagem';
import Swal from 'sweetalert2';
import { Aula } from '../../shared/aula';
import { HistoricoService } from '../../shared/historico.service';
import { Pagamento } from '../../shared/pagamento';

@Component({
  selector: 'app-minhas-aulas',
  templateUrl: './minhas-aulas.component.html',
  styleUrls: ['./minhas-aulas.component.scss']
})
export class MinhasAulasComponent implements OnInit {

  minhasAulas: Aula[] = [];
  postagem: Postagem;

  getDark: string = localStorage.getItem('dark');

  constructor(private historicoService: HistoricoService) { }

  ngOnInit(): void {
    this.listarMinhasAulas();
  }

  listarMinhasAulas(){
    let idUsuario = Number(localStorage.getItem('id'));

    this.historicoService.listarMinhasAulas(idUsuario)
    .subscribe(
      (data) => {
        this.minhasAulas = data;
    })
  }

  mascaraDecimalValor(i: number) {

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL' 
    });

    const formatted = formatter.format(i);
    return formatted;
  }

  confirmarConcluirAula(index){
    Swal.fire({
      icon: 'warning',
      title: 'Confirmar ação',
      text: 'Tem certeza que deseja confirmar a aula? Você não poderá desfazer essa confirmação.',
      confirmButtonColor: '#118ab2',
      cancelButtonText: 'Cancelar',
      showConfirmButton: true,
      showCancelButton: true,
      preConfirm: () => {
        this.concluirAula(index)
      }
    })
  }

  concluirAula(index){
    let aula: Aula;
    let pagamento: Pagamento;

    pagamento = {
      id: this.minhasAulas[index].id
    }

    aula = {
      id: this.minhasAulas[index].id,
      pagamento: pagamento,
      hora: this.minhasAulas[index].hora,
      id_mentor: this.minhasAulas[index].id_mentor,
      id_usuario: this.minhasAulas[index].id_usuario,
      conf_mentor: this.minhasAulas[index].conf_mentor,
      conf_usuario: true
    }

    this.historicoService.atualizaAula(aula)
    .subscribe(
      () => {
        Swal.fire(
          'Sucesso!',
          'Aula confirmada e finalizada.',
          'success'
        );
    })
  }

}
