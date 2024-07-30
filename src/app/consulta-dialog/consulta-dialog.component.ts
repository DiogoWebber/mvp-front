import { DataService } from './../data-service.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

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
    private dataService: DataService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onSubmit(): void {
    const dialogData = {
      documentType: this.documentType,
      documentValue: this.documentValue,
      selectedDate: this.selectedDate,
      researchPeriod: this.researchPeriod
    };

    this.dataService.setDialogData(dialogData);
    this.dialogRef.close(dialogData.documentValue);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
