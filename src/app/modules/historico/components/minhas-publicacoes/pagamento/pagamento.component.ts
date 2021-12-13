import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Postagem } from 'src/app/modules/feed/shared/postagem';
import { Propostas } from 'src/app/modules/feed/shared/propostas';
import Swal from 'sweetalert2';
import { HistoricoService } from '../../../shared/historico.service';
import { MentorPagamento } from '../../../shared/mentorPagamento';
import { Pagamento } from '../../../shared/pagamento';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent implements OnInit, OnChanges {

  @Input() contPagamento: number;
  @Input() publicacao: Postagem;
  @Input() proposta: Propostas;

  formularioPagamento: FormGroup;
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder, private historicoService: HistoricoService) { }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  ngOnChanges(): void {
    if (this.contPagamento > 0){
      console.log("teste");
    }
  }

  inicializarFormulario(){
    this.formularioPagamento = this.formBuilder.group({
      nomeCartao: ['', Validators.required],
      numeroCartao: ['', Validators.required],
      validade: ['', Validators.required],
      cdv: ['', Validators.required]
    })
  }

  validarFormulario(){
    if (this.formularioPagamento.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Dados inválidos.',
        text: 'Por favor, preencha o formulário corretamente.',
        confirmButtonColor: '#118ab2'
      })
    } else {
      this.setarDadosObjeto();
    }
  }

  setarDadosObjeto(){
    let pagamento: Pagamento;
    const aluno = this.publicacao.autor;
    const numeroCartao = this.formularioPagamento.controls.numeroCartao.value;
    const cdv = this.formularioPagamento.controls.cdv.value;
    const nomeCartao = this.formularioPagamento.controls.nomeCartao.value;
    const validade = this.formularioPagamento.controls.validade.value;
    const proposta = this.proposta;
    const valorProposta = this.proposta.valor;
    let mentor: MentorPagamento;

    mentor = {
      id: this.proposta.mentor.id
    }

    pagamento = {
      aluno: aluno,
      nro_cartao: numeroCartao,
      cdv: cdv,
      nome_titular: nomeCartao,
      validade: validade,
      proposta: proposta,
      vl_pago: valorProposta,
      mentor_pag: mentor
    }

    console.log(pagamento);

    this.pagar(pagamento);
  }

  pagar(pagamento: Pagamento){
    this.loading = true;

    this.historicoService.pagar(pagamento)
    .subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Aula paga com sucesso.',
          text: 'Sua aula foi paga e os detalhes podem ser acessados no menu "minhas aulas".',
          confirmButtonColor: '#118ab2'
        }).then(() => {
          this.formularioPagamento.reset();
          this.loading = false;

          let element: HTMLElement = document.getElementById('fecharModalDetalhe') as HTMLElement;
          element.click();
        })
    }).add(() => {
      this.loading = false;
    })
  }

}
