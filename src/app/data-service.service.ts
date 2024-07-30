import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dialogData: any | null = null;
  private apiData: any | null = null;

  setDialogData(data: any): void {
    this.dialogData = data;
  }

  getDialogData(): any | null {
    return this.dialogData;
  }

  clearDialogData(): void {
    this.dialogData = null;
  }

  setApiData(data: any): void {
    this.apiData = data;
  }

  getApiData(): any | null {
    return this.apiData;
  }

  clearApiData(): void {
    this.apiData = null;
  }
}
