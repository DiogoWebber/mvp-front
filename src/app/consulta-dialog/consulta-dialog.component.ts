import { Component, Inject, ChangeDetectorRef, NgZone } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SearchHistory } from '../model/search-history.model';
import { ConsultaService } from '../views/consulta/consulta.service';

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
    @Inject(MAT_DIALOG_DATA) public data: any,
    
  ) { }

  onSubmit(): void {
    const dialogData: SearchHistory = {
      documentType: this.documentType,
      documentValue: this.documentValue,
      selectedDate: this.selectedDate,
      researchPeriod: this.researchPeriod
    };
    
    // Adiciona ao histórico
    this.consultaService.addSearchToHistory(dialogData);
      // Redireciona após adicionar ao histórico
      if (dialogData.documentType === 'cpf') {
        this.router.navigate(['/peps'], { queryParams: { cpf: dialogData.documentValue } });
      } else if (dialogData.documentType === 'cnpj') {
        this.router.navigate(['/cepim'], { queryParams: { cnpj: dialogData.documentValue } });
      }
    ;

    this.dialogRef.close();
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
