import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PepsModel } from 'src/app/model/peps.model';
import { CepimModel } from 'src/app/model/cepim.model';
import { HistoricoModel } from 'src/app/model/historicoModel';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private pepsApiUrl = 'https://localhost:7121/api/v1/peps/busca';
  private cepimApiUrl = 'https://localhost:7121/api/v1/cepim/busca';
  private baseUrl = 'https://localhost:7121/api/v1/Historico/historico';
  private searchHistory: BehaviorSubject<HistoricoModel[]> = new BehaviorSubject<HistoricoModel[]>([]);

  constructor(private http: HttpClient) { }

  getPepsByCpf(pesquisa: any): Observable<PepsModel[]> {
    const url = `${this.pepsApiUrl}?Tipo=${pesquisa.tipo}&Documento=${pesquisa.documento}&Data=${pesquisa.data}&Periodo=${pesquisa.periodo}`;
    return this.http.get<PepsModel[]>(url);
  }

  getCepimByCnpj(cnpj: string): Observable<CepimModel[]> {
    const url = `${this.cepimApiUrl}/${encodeURIComponent(cnpj)}`;
    return this.http.get<CepimModel[]>(url);
  }

  getSearchHistory(): Observable<HistoricoModel[]> {
    return this.http.get<HistoricoModel[]>(`${this.baseUrl}`);
  }

  getDetailsById(id: number): Observable<PepsModel> {
    return this.http.get<PepsModel>(`${this.baseUrl}/${id}`);
  }
}
