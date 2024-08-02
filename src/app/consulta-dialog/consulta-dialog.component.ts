import { Component, Inject, ChangeDetectorRef, NgZone } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    console.log('Dados do diálogo:', dialogData); // Adicione um log para verificar os dados
    this.dialogRef.close(dialogData); // Passa os dados ao fechar o diálogo
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
