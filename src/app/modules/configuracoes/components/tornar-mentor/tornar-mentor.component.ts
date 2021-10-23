import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tornar-mentor',
  templateUrl: './tornar-mentor.component.html',
  styleUrls: ['./tornar-mentor.component.scss']
})
export class TornarMentorComponent implements OnInit {

  formulario: FormGroup;
  erroFormulario: boolean = false;

  constructor(public bsModelRef: BsModalService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(){
    this.formulario = this.formBuilder.group({
      curriculo: ['', Validators.compose([Validators.required])]
    })
  }

  validarFormulario(){
    if (this.formulario.invalid){
      this.erroFormulario = true;
      console.log(this.erroFormulario);
    } else {
      this.erroFormulario = false;
      console.log("Enviou");
    }

  }

  onClose(){
    this.bsModelRef.hide();
  }

  // ****************** VALIDAÇÕES DE ERRO ******************

  aplicaCssErro(campo) {
    return {
      'is-invalid': this.verificaTouched(campo) && !this.formulario.valid
    }
  }

  verificaTouched(campo) {
    return !this.formulario.get(campo).valid && this.erroFormulario;
  }

}
