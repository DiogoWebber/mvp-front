import { Component, Inject, ChangeDetectorRef, NgZone } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogData } from '../model/dialog-data.model';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-consulta-dialog',
  templateUrl: './consulta-dialog.component.html',
  styleUrls: ['./consulta-dialog.component.css'],
})
export class ConsultaDialogComponent {
  documentType: string = '';
  documentValue: string = '';
  selectedDate: Date | null = null;
  researchPeriod: string = '';

  constructor(
    public dialogRef: MatDialogRef<ConsultaDialogComponent>,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSubmit(): void {
    if (this.isFormValid()) {
      const dialogData: DialogData = {
        tipo: this.documentType,
        documento: this.documentValue,
        data: this.formatDateToString(this.selectedDate!),
        periodo: this.researchPeriod,
      };

      const navigationPath = this.documentType === 'cpf' ? '/peps' : '/cepim';

      this.router.navigate([navigationPath], { queryParams: { ...dialogData } });
      this.dialogRef.close();
    }else {
      this.snackBar.open('Preencha todos os campos antes de fazer a consulta', 'Fechar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
  }
}
  onClose(): void {
    this.dialogRef.close();
  }

  onDocumentTypeChange(newType: string): void {
    this.documentType = newType;
    this.ngZone.run(() => this.clearDocumentValue());
    this.cdr.detectChanges();
  }

  clearDocumentValue(): void {
    this.documentValue = '';
  }

  private formatDateToString(date: Date): string {
    return formatDate(date, 'dd-MM-yyyy', 'en-US');
  }

  private isFormValid(): boolean {
    return !!this.documentType && !!this.documentValue && !!this.selectedDate && !!this.researchPeriod;
  }
}
