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
    this.submitted = true;

    if(this.formulario.valid){
      console.log(this.formulario.value);
      this.onClose();
    }

  }

  onClose() {
    this.bsModalRef.hide();
    this.formulario.reset();
    this.submitted = false;
  }

  //Verifica e retorna campo inválido
  verificaValidTouched(campo) {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  //Aplica a classe Bootstrap para campos inválidos
  aplicaCssErro(campo) {
    return{
      'is-invalid': this.verificaValidTouched(campo) || this.submitted === true,
    }
  }

}
