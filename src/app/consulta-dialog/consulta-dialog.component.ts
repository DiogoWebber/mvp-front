import { Component, Inject, ChangeDetectorRef, NgZone } from '@angular/core';
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
    private router: Router,
    private consultaService: ConsultaService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
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
    
    if (dialogData.documentType === 'cpf') {
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
    } else if (dialogData.documentType === 'cnpj') {
      this.consultaService.getCepimByCnpj(dialogData.documentValue).subscribe({
        next: (data) => {
          console.log('Dados recebidos da API:', data);
          this.router.navigate(['/cepim'], { queryParams: { cnpj: dialogData.documentValue } });
          this.dialogRef.close(dialogData.documentValue);
        },
        error: (error) => {
          console.error('Erro ao buscar dados da API', error);
        }
      });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onDocumentTypeChange(newType: string): void {
    this.documentType = newType;
    this.ngZone.run(() => {
      this.clearDocumentValue();
    });
    this.cdr.detectChanges();
  }

  clearDocumentValue(): void {
    this.documentValue = '';
  }
}
