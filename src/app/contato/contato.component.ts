import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario: FormGroup;
  contatos: Contato[] = [];
  colunas = ['id', 'nome', 'email', 'favorito'];

  constructor(
    private contatoService: ContatoService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.montarFormulario();

    this.listarContatos();
  }

  private montarFormulario() {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  listarContatos() {
    this.contatoService.list().subscribe(
      response => {
        this.contatos = response;
      }
    )
  }

  submit() {
    const formValues = this.formulario.value;
    const contato: Contato = new Contato(formValues.nome, formValues.email);
    this.contatoService.save(contato).subscribe(
      response => {
       this.contatos.push(response);
        
      }
    )
  }

}
