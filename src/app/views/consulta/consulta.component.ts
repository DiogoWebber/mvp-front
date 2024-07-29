import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ConsultaDialogComponent } from './../../consulta-dialog/consulta-dialog.component';
import { PepsModel } from './../../model/peps.model';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  private apiUrl = 'https://localhost:7121/api/v1/peps/busca'; // URL base da sua API

  constructor(
    private dialog: MatDialog,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  navigateToConsultaCreate(): void {
    const dialogRef = this.dialog.open(ConsultaDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(cpf => {
      if (cpf) {
        this.consultarPeps(cpf);
      }
    });
  }

  private consultarPeps(cpf: string): void {
    const url = `${this.apiUrl}/${encodeURIComponent(cpf)}`; // Construa a URL com o CPF
    this.http.get<PepsModel>(url).subscribe(data => {
      console.log('Dados recebidos da API:', data); 
      this.dialog.open(ConsultaDialogComponent, {
        width: '400px',
        data: data,

      });
    }, error => {
      console.error('Erro ao buscar dados da API', error);
    });
  }
}
