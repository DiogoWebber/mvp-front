import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PepsModel } from 'src/app/model/peps.model';
import { CepimModel } from 'src/app/model/cepim.model';
import { DialogData } from 'src/app/model/dialog-data.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private pepsApiUrl = 'https://localhost:7121/api/v1/peps/busca';
  private cepimApiUrl = 'https://localhost:7121/api/v1/cepim/busca';
  private searchHistory: BehaviorSubject<DialogData[]> = new BehaviorSubject<DialogData[]>([]);

  constructor(private http: HttpClient) { }

  getPepsByCpf(pesquisa: DialogData): Observable<PepsModel[]> {
    const url = `${this.pepsApiUrl}?Tipo=${pesquisa.tipo}&Documento=${pesquisa.documento}&Data=${pesquisa.data}&Periodo=${pesquisa.periodo}}`;
    return this.http.get<PepsModel[]>(url);
  }

  getCepimByCnpj(cnpj: string): Observable<CepimModel[]> {
    const url = `${this.cepimApiUrl}/${encodeURIComponent(cnpj)}`;
    return this.http.get<CepimModel[]>(url);
  }

  getSearchHistory(): Observable<DialogData[]> {
    return this.searchHistory.asObservable();
  }

  addSearchToHistory(search: DialogData): void {
    const currentHistory = this.searchHistory.getValue();
    this.searchHistory.next([...currentHistory, search]);
  }
}
