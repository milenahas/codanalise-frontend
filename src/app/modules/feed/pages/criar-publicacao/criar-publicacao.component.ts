import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-criar-publicacao',
  templateUrl: './criar-publicacao.component.html',
  styleUrls: ['./criar-publicacao.component.scss']
})
export class CriarPublicacaoComponent implements OnInit {

  //formulário reativo
  formulario: FormGroup;
  submitted: boolean = false; //Para caso o formulário for submetido
  isDisabled: boolean= false; //Desabilitar o input valor caso o usuário escolha "Sem valor"

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private http: HttpClient
    ) { }

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      titulo: [null, Validators.required],
      desc: [null, [Validators.required, Validators.minLength(5) , Validators.maxLength(250)]],
      valor: [null],
      semValor: [null, Validators.pattern('true')],
      arquivo: [null],
      linguagens: [null, Validators.required],
    })

  }


  onSubmit() {
    this.onClose();
  }

  onClose() {
    if (this.formulario.valid) {
      this.bsModalRef.hide();
      this.formulario.reset();
      this.submitted = false;
    }
    this.submitted = true;
  }

  //Desabilita o input valor caso o usuário escolha "Sem valor"
  mudarSemvalor() {
    this.isDisabled = !this.isDisabled;

    if(this.isDisabled){
      this.formulario.controls['valor'].disable();
    }else {
      this.formulario.controls['valor'].enable();
    }
  }

  //Verifica e retorna erro formulario submetido inválido
  verificaValidSubmitted(campo) {
    return this.submitted && !this.formulario.get(campo).valid;
  }

  //Verifica e retorna campo touched inválido
  verificaTouched(campo) {
    return this.formulario.get(campo).touched;
  }

  //Aplica a classe Bootstrap para campos inválidos
  aplicaCssErro(campo) {
    return{
      'is-invalid': this.verificaTouched(campo) || this.verificaValidSubmitted(campo)
    }
  }

}
