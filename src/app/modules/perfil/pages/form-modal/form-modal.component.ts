import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Usuario } from 'src/app/modules/usuario/shared/usuario';
import Swal from 'sweetalert2';
import { PerfilService } from '../../shared/perfil.service';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss']
})
export class FormModalComponent implements OnInit {

  @Input() area: string;
  @Input() acao: string;

  perfil: Usuario;
  email: string = localStorage.getItem('email');
  formulario: FormGroup;

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private perfilService: PerfilService) { }

  ngOnInit(): void {
    this.inicializarFormularioExp();
    this.pegarDadosUsuarioEspecifico();
  }

  pegarDadosUsuarioEspecifico(){
    this.perfilService.usuarioEspecifico(this.email).subscribe({
      next: (data) => {
        this.perfil = data;
      },
      error: err => console.log('Erro', err)
    })
  }

  inicializarFormularioExp() {
    this.formulario = this.formBuilder.group({
      empresa: ['', [Validators.required, Validators.minLength(3)]],
      cargo: ['', Validators.required],
      dataInicio: ['', Validators.required],
      dataFinal: [''],
    });
  }

  setarDadosObjeto() {
    this.perfil.exp.push({
      empresa: this.formulario.get('empresa').value,
      cargo: this.formulario.get('cargo').value,
      dtini: this.formulario.get('dataInicio').value + "T23:59:00.809+00:00",
      dtfim: this.formulario.get('dataFinal').value + "T23:59:00.809+00:00"
    });
      /*this.perfil.exp = {
        empresa: this.formulario.controls.empresa.value,
        cargo: this.formulario.controls.cargo.value,
        dataInicio: this.formulario.controls.dataInicio.value,
        dataFim: this.formulario.controls.dataFinal.value
      }*/

    this.enviarDados()
  }

  enviarDados() {
    console.log(this.perfil)
    this.perfilService.editarUsuario(this.perfil)
    .subscribe(
      (data: Usuario) => {
        Swal.fire(
          'Sucesso!',
          'Publicação realizada com sucesso!',
          'success'
        )
    },
    error => {
      Swal.fire(
        'Erro',
        'Algo deu errado.',
        'error'
      )
    }
    )
  }

  onSubmit() {
    if (!this.formulario.valid){
      /*Object.keys(this.formularioEsco.controls).forEach(campo => {
        const controle = this.formularioEsco.get(campo);
        controle.markAsTouched();
      });*/
    }else {
      this.setarDadosObjeto();
    }
  }

  onClose() {
    this.bsModalRef.hide()
  }

}
