import { Component, Inject, ChangeDetectorRef, NgZone } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { DialogData } from "../model/dialog-data.model";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-consulta-dialog",
  templateUrl: "./consulta-dialog.component.html",
  styleUrls: ["./consulta-dialog.component.css"],
})
export class ConsultaDialogComponent {
  documentType: string = "";
  documentValue: string = "";
  selectedDate: Date | null = null;
  researchPeriod: string = "";

  constructor(
    public dialogRef: MatDialogRef<ConsultaDialogComponent>,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSubmit(): void {
    const formatDateToString = (date: Date): string => {
      return formatDate(date, 'dd-MM-yyyy', 'en-US');
    };

    const dialogData: DialogData = {
      tipo: this.documentType,
      documento: this.documentValue,
      data: formatDateToString(this.selectedDate!),
      periodo: this.researchPeriod,
    };

    if (dialogData.tipo === "cpf") {
      this.router.navigate(["/peps"], { queryParams: { ...dialogData } });
    } else if (dialogData.tipo === "cnpj") {
      this.router.navigate(["/cepim"], { queryParams: { ...dialogData } });
    }

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
    this.documentValue = "";
  }
}
