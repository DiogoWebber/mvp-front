import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Use ! para indicar que será inicializado
  @ViewChild(MatSort) sort!: MatSort; // Use ! para indicar que será inicializado

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private consultaService: ConsultaService,
    private headerService: HeaderService
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
    const dialogRef = this.dialog.open(ConsultaDialogComponent, {
      width: '500px'
    });
  }

  performSearchFromHistory(history: SearchHistory): void {
    this.router.navigate(['/peps'], { queryParams: { cpf: history.documentValue } });
  }
}
