import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from '../../clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit {
  clientes: Cliente[] = [];
  
  constructor(private service: ClientesService, private router : Router) { }

  ngOnInit(): void {
    this.service.getClientes().subscribe(
      response => this.clientes = response
    );
  }

  novoCadastro() {
    this.router.navigate(['/clientes-form']);
  }
}