import { Injectable } from '@angular/core';
import { PepsModel } from './model/peps.model';
import { Observable, of } from 'rxjs'; // Adicione esta linha

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dialogData: any | null = null;
  private apiData: PepsModel[] = []; // Ajuste o tipo conforme necessário

  setDialogData(data: any): void {
    this.dialogData = data;
  }

  getDialogData(): any | null {
    return this.dialogData;
  }

  clearDialogData(): void {
    this.dialogData = null;
  }

  setApiData(data: PepsModel[]): void {
    this.apiData = data;
  }

  getApiData(): Observable<PepsModel[]> {
    // Retorna um Observable com os dados
    return of(this.apiData);
  }
  
}
