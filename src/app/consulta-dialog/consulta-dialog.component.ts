import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PepsModel } from '../model/peps.model';

@Component({
  selector: 'app-consulta-dialog',
  templateUrl: './consulta-dialog.component.html',
  styleUrls: ['./consulta-dialog.component.css']
})
export class ConsultaDialogComponent {
  documentType: string = ''; // Propriedade para tipo de documento (CPF ou CNPJ)
  documentValue: string = ''; // Propriedade para CPF ou CNPJ
  selectedDate: Date | null = null; // Propriedade para a data selecionada
  researchPeriod: string = ''; // Propriedade para o intervalo de pesquisa (1m, 2m, 3m)

  constructor(
    public dialogRef: MatDialogRef<ConsultaDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: PepsModel
  ) { }

  onSubmit(): void {
    if (this.documentValue) {
      // Aqui você pode fazer o processamento necessário com os dados
      this.dialogRef.close(this.documentValue);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
