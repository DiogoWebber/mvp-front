import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConsultaDialogComponent } from './../../consulta-dialog/consulta-dialog.component';
import { PepsModel } from './../../model/peps.model';
import { DataService } from './../../data-service.service';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  private apiUrl = 'https://localhost:7121/api/v1/peps/busca'; 

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private dataService: DataService,
    private headerService: HeaderService
  ) {
    this.headerService.headerData = {
      title: 'Consultas',
      icon: 'search',
      routeUrl: ''
    };
  }

  ngOnInit(): void {
  }

  navigateToConsultaCreate(): void {
    const dialogRef = this.dialog.open(ConsultaDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(cpf => {
      if (cpf) {
        this.consultarPeps(cpf);
      }
    });
  }

  private consultarPeps(cpf: string): void {
    const url = `${this.apiUrl}/${encodeURIComponent(cpf)}`;
    this.http.get<PepsModel[]>(url).subscribe({
      next: (data: PepsModel[]) => {
        console.log('Dados recebidos da API:', data);
        this.dataService.setApiData(data);
        this.router.navigate(['/peps']);
      },
      error: (error: any) => {
        console.error('Erro ao buscar dados da API', error);
      }
    });
  }
}
