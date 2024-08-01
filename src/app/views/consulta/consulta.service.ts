// src/app/views/consulta/consulta.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PepsModel } from 'src/app/model/peps.model';
import { SearchHistory } from 'src/app/model/search-history.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private apiUrl = 'https://localhost:7121/api/v1/peps/busca';
  private searchHistory: BehaviorSubject<SearchHistory[]> = new BehaviorSubject<SearchHistory[]>([]);
  
  constructor(private http: HttpClient) { }

  getPepsByCpf(cpf: string): Observable<PepsModel[]> {
    const url = `${this.apiUrl}/${encodeURIComponent(cpf)}`;
    return this.http.get<PepsModel[]>(url);
  }

  getSearchHistory(): Observable<SearchHistory[]> {
    return this.searchHistory.asObservable();
  }

  addSearchToHistory(search: SearchHistory): void {
    const currentHistory = this.searchHistory.getValue();
    this.searchHistory.next([...currentHistory, search]);
  }
}
