// src/app/consulta-dialog/consulta-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConsultaService } from '../views/consulta/consulta.service';
import { SearchHistory } from '../model/search-history.model';

@Component({
  selector: 'app-consulta-dialog',
  templateUrl: './consulta-dialog.component.html',
  styleUrls: ['./consulta-dialog.component.css']
})
export class ConsultaDialogComponent {
  documentType: string = ''; 
  documentValue: string = '';
  selectedDate: Date | null = null; 
  researchPeriod: string = '';

  constructor(
    public dialogRef: MatDialogRef<ConsultaDialogComponent>,
    private consultaService: ConsultaService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onSubmit(): void {
    const dialogData: SearchHistory = {
      documentType: this.documentType,
      documentValue: this.documentValue,
      selectedDate: this.selectedDate,
      researchPeriod: this.researchPeriod
    };

    this.consultaService.addSearchToHistory(dialogData);
    this.consultaService.getPepsByCpf(dialogData.documentValue).subscribe({
      next: (data) => {
        console.log('Dados recebidos da API:', data);
        this.router.navigate(['/peps'], { queryParams: { cpf: dialogData.documentValue } });
        this.dialogRef.close(dialogData.documentValue);
      },
      error: (error) => {
        console.error('Erro ao buscar dados da API', error);
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
