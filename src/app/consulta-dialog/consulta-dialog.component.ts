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
  cpf: string = '';

  constructor(
    public dialogRef: MatDialogRef<ConsultaDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: PepsModel
  ) { }

  onSubmit(): void {
    if (this.cpf) {
      this.dialogRef.close(this.cpf);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
