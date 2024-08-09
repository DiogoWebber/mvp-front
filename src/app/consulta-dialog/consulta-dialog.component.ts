import { Component, Inject, ChangeDetectorRef, NgZone, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogData } from '../model/dialog-data.model';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CpfCnpjValidator } from '../Util/cpf-cnpj.validator';

@Component({
  selector: 'app-consulta-dialog',
  templateUrl: './consulta-dialog.component.html',
  styleUrls: ['./consulta-dialog.component.css'],
})

export class ConsultaDialogComponent implements OnInit{

  form!: FormGroup
  documentType: string = '';
  documentValue: string = '';
  selectedDate: Date | null = null;
  researchPeriod: string = '';

  constructor(
    public dialogRef: MatDialogRef<ConsultaDialogComponent>,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder : FormBuilder
  ) {}


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      documentType: ['', Validators.required],
      documentValue: ['', [Validators.required, CpfCnpjValidator.validateCpfCnpj()]], // Apply the custom validator here
      selectedDate: ['', Validators.required],
      researchPeriod: ['', Validators.required]
    })
  }

  onSubmit(): void {

      const dialogData: DialogData = {
        tipo: this.form.value.documentType,
        documento: this.form.value.documentValue,
        data: this.formatDateToString(this.form.value.selectedDate),
        periodo: this.form.value.researchPeriod,
      };

      const navigationPath = this.documentType === 'cpf' ? '/peps' : '/cepim';

      this.router.navigate([navigationPath], { queryParams: { ...dialogData } });
      this.dialogRef.close();
    
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


}
