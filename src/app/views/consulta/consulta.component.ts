import { Router } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConsultaDialogComponent } from './../../consulta-dialog/consulta-dialog.component';
import { ConsultaService } from './consulta.service';
import { DialogData } from 'src/app/model/dialog-data.model';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['user', 'dataConsulta', 'documentType', 'documentValue', 'selectedDate', 'researchPeriod', 'actions'];
  dataSource: MatTableDataSource<DialogData> = new MatTableDataSource<DialogData>([]);
  
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

  performSearchFromHistory(history: DialogData): void {
    this.Router.navigate(['/peps'], { queryParams: { cpf: history.documento } });
  }

  // performSearchFromHistory(history: DialogData): void {
  //   this.Router.navigate(['/peps'], { queryParams: { id: itemHistorico.id } });
  // }


  // performSearchFromHistory(history: DialogData): void {
  //   if (history.tipo === 'cpf') {
  //     this.Router.navigate(['/peps'], { queryParams: { cpf: history.documento } });
  //   } else if (history.tipo === 'cnpj') {
  //     this.Router.navigate(['/cepim'], { queryParams: { cnpj: history.documento } });
  //   }
  // }
}
