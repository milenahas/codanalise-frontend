import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Usuario } from 'src/app/modules/usuario/shared/usuario';
import { FormModalComponent } from '../../shared/form-modal/form-modal.component';
import { PerfilService } from '../../shared/perfil.service';
import Swal from 'sweetalert2'
import { Experiencia } from 'src/app/modules/usuario/shared/experiencia';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  bsModalRef?: BsModalRef;
  isEdit: boolean = false;

  usuario: Usuario;
  experiencia: Experiencia[];
  formulario: FormGroup;
  email: string = localStorage.getItem('email');
  loading: boolean = false;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private perfilService: PerfilService
    ) { }

  ngOnInit(): void {
    this.pegarDadosUsuarioEspecifico();
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.formulario = this.formBuilder.group({
      nome: [''],
      sobrenome: [''],
      email: [''],
      senha: [''],
      sobre: [''],
      github: [''],
      linkedin: [''],
      status: [''],
      tipoUsuario: [''],

      instituicao: [''],
      nivelInstituicao: [''],
      dataInicio: [''],
      dataFinal: [''],

      empresa: [''],
      cargo: [''],
      dtini: [''],
      dtfim: [''],

      linguagem: [''],
      nivelLinguagem: [''],
      descricao: [''],
    });
  }

  pegarDadosUsuarioEspecifico(){
    this.loading = true;
    this.perfilService.usuarioEspecifico(this.email).subscribe({
      next: (data) => {
        this.usuario = data;
        this.setarDadosInput();
      },
      error: err => console.log('Erro', err)
    }).add(() => {
      this.loading = false;
    })
  }

  setarDadosInput() {
    this.formulario.controls.nome.setValue(this.usuario.nome);
    this.formulario.controls.sobrenome.setValue(this.usuario.sobrenome);
    this.formulario.controls.email.setValue(this.usuario.email);
    this.formulario.controls.senha.setValue(this.usuario.senha);
    this.formulario.controls.sobre.setValue(this.usuario.sobre);
    this.formulario.controls.github.setValue(this.usuario.github);
    this.formulario.controls.linkedin.setValue(this.usuario.linkedin);
    this.formulario.controls.status.setValue(this.usuario.status);

    if (this.usuario.exp.length > 0){
      this.formulario.controls.empresa.setValue(this.usuario.exp[0].empresa);
      this.formulario.controls.cargo.setValue(this.usuario.exp[0].cargo);
      this.formulario.controls.dtini.setValue(this.usuario.exp[0].dtini);
      this.formulario.controls.dtfim.setValue(this.usuario.exp[0].dtfim);
    }

    if (this.usuario.linguagem.length > 0 ){
      this.formulario.controls.linguagem.setValue(this.usuario.linguagem[0].ferramenta);
      this.formulario.controls.nivelLinguagem.setValue(this.usuario.linguagem[0].exp_ferramenta);
    }
  }

  // *************************************
  // *********** Alterar dados ***********
  // *************************************

  alterarDadosUsuario(){
    this.setarDadosObjeto();

    this.perfilService.editarUsuario(this.usuario)
    .subscribe(
      (data: Usuario) => {
        Swal.fire(
          'Sucesso!',
          'Os dados foram alterados com sucesso!',
          'success'
        ).then((result) => {
          location.reload();
          this.isEdit = !this.isEdit;
        });

    },
    error => {
      Swal.fire(
        'Erro',
        'Verifique os dados e tente novamente.',
        'error'
      ).then((result) => {
        this.isEdit = true;
      });
    })
  }

  setarDadosObjeto(){
    this.usuario.nome = this.formulario.get('nome').value;
    this.usuario.sobrenome = this.formulario.get('sobrenome').value;
    this.usuario.email = this.formulario.get('email').value;
    this.usuario.senha = this.formulario.get('senha').value;
    this.usuario.sobre = this.formulario.get('sobre').value;
    this.usuario.github = this.formulario.get('github').value;
    this.usuario.linkedin = this.formulario.get('linkedin').value;
    this.usuario.status = this.formulario.get('status').value;

    // this.usuario.instituicao = this.formulario.get('instituicao').value;
    // this.usuario.nivelInstituicao = this.formulario.get('nivelInstituicao').value;
    // this.usuario.dataInicio = this.formulario.get('dataInicio').value;
    // this.usuario.dataFinal = this.formulario.get('dataFinal').value;

  this.usuario.exp.push({
    empresa: this.formulario.get('empresa').value,
    cargo: this.formulario.get('cargo').value,
    dtini: this.formulario.get('dtini').value + "T23:59:00.809+00:00",
    dtfim: this.formulario.get('dtfim').value + "T23:59:00.809+00:00"
  });

  this.usuario.linguagem.push({
    ferramenta: this.formulario.get('linguagem').value,
    exp_ferramenta: this.formulario.get('nivelLinguagem').value,
    // descricao: this.formulario.get('descricao').value
  })
  }

  add(fArea) {
    this.bsModalRef = this.modalService.show(FormModalComponent);
    this.bsModalRef.content.area = fArea;
  }

  // Botões

  editar() {
    this.isEdit = !this.isEdit;
  }

  cancelar() {
    this.isEdit = !this.isEdit;
  }

  setarMentor(){
    this.usuario.mentor = true;
  }

}
