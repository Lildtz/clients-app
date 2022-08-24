import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  success: boolean = false;
  errors?: string[];
  idCliente?: number;
  constructor( private service: ClientesService, private router: Router, private activatedRoute: ActivatedRoute) { 
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    
    if (id) {
      this.idCliente = Number(id);
      this.service.getClienteById(this.idCliente).subscribe(
        response => this.cliente = response,
        errorResponse => this.cliente = new Cliente()
      );
    }
  }

  onSubmit(){
    this.service.salvar(this.cliente).subscribe(
      response => {
        this.errors = [];
        this.success = true;
        this.cliente = response;
      } , errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
      })
  }

  onClickVoltar(){
    this.router.navigate(['/clientes-list']);
  }

}
