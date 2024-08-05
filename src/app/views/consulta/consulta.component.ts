import { Router } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConsultaDialogComponent } from './../../consulta-dialog/consulta-dialog.component';
import { ConsultaService } from './consulta.service';
import { SearchHistory } from 'src/app/model/search-history.model';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['documentType', 'documentValue', 'selectedDate', 'researchPeriod', 'actions'];
  dataSource: MatTableDataSource<SearchHistory> = new MatTableDataSource<SearchHistory>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private consultaService: ConsultaService,
    private headerService: HeaderService,
    private Router: Router
  ) {
    this.headerService.headerData = {
      title: 'Consultas',
      icon: 'search',
      routeUrl: ''
    };
  }

  ngOnInit(): void {
    this.consultaService.getSearchHistory().subscribe(history => {
      this.dataSource.data = history;
    });
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  navigateToConsultaCreate(): void {
    this.dialog.open(ConsultaDialogComponent, {
      width: '500px'
    });
  }

  performSearchFromHistory(history: SearchHistory): void {
    if (history.documentType === 'cpf') {
      this.Router.navigate(['/peps'], { queryParams: { cpf: history.documentValue } });
    } else if (history.documentType === 'cnpj') {
      this.Router.navigate(['/cepim'], { queryParams: { cnpj: history.documentValue } });
    }
  }

  formatDocumentValue(value: string, type: string): string {
    if (type === 'cpf') {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (type === 'cnpj') {
      return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    return value;
  }
}
