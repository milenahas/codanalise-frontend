import { Component, Input, OnInit } from '@angular/core';
import { Mentor } from 'src/app/modules/feed/shared/mentor';
import { Postagem } from 'src/app/modules/feed/shared/postagem';
import { Usuario } from 'src/app/modules/usuario/shared/usuario';
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

  @Input() mentor: boolean;
  @Input() mentorDados: Mentor;

  usuario: Usuario;

  minhasAulas: Aula[] = [];
  postagem: Postagem;

  getDark: string = localStorage.getItem('dark');

  constructor(private historicoService: HistoricoService) { }

  ngOnInit(): void {
    this.validaTipoUsuario();
  }

  validaTipoUsuario(){
    if (this.mentor == false){
      this.listarMinhasAulasAluno();
    } else {
      this.listarMinhasAulasMentor();
    }
  }

  listarMinhasAulasAluno(){
    let idUsuario = Number(localStorage.getItem('id'));

    this.historicoService.listarMinhasAulasUsuario(idUsuario)
    .subscribe(
      (data) => {
        this.minhasAulas = data;
    })
  }

  listarMinhasAulasMentor(){
    let idMentor = this.mentorDados.id;

    this.historicoService.listarMinhasAulasMentor(idMentor)
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

    if (!this.mentor){
      aula = {
        id: this.minhasAulas[index].id,
        pagamento: pagamento,
        hora: this.minhasAulas[index].hora,
        id_mentor: this.minhasAulas[index].id_mentor,
        id_usuario: this.minhasAulas[index].id_usuario,
        conf_mentor: this.minhasAulas[index].conf_mentor,
        conf_usuario: true
      }
    } else {
      aula = {
        id: this.minhasAulas[index].id,
        pagamento: pagamento,
        hora: this.minhasAulas[index].hora,
        id_mentor: this.minhasAulas[index].id_mentor,
        id_usuario: this.minhasAulas[index].id_usuario,
        conf_mentor: true,
        conf_usuario: this.minhasAulas[index].conf_usuario
      }
    }

    this.historicoService.atualizaAula(aula)
    .subscribe(
      () => {
        Swal.fire(
          'Sucesso!',
          'Aula confirmada e finalizada.',
          'success'
        );

        if (!this.mentor){
          this.listarMinhasAulasAluno();
        } else {
          this.listarMinhasAulasMentor();
        }
        
    })
  }

}
