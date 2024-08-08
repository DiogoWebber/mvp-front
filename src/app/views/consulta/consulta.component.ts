import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConsultaDialogComponent } from './../../consulta-dialog/consulta-dialog.component';
import { ConsultaService } from './consulta.service';
import { HistoricoModel } from 'src/app/model/historicoModel';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['usuario', 'dataAtual', 'documentType', 'documentValue', 'data', 'periodo', 'actions'];
  dataSource: MatTableDataSource<HistoricoModel> = new MatTableDataSource<HistoricoModel>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
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
    this.consultaService.getSearchHistory().subscribe({
      next: (history) => {
        console.log('Dados recebidos:', history);
        
        // Converte datas de string para Date
        history.forEach(h => {
          if (typeof h.dataAtual === 'string') {
            h.dataAtual = this.convertToDate(h.dataAtual);
          }
          if (typeof h.data === 'string') {
            h.data = this.convertToDate(h.data);
          }
        });

        this.dataSource.data = history;
      },
      error: (err) => {
        console.error('Erro ao carregar histórico', err);
      }
    });
  }

  private convertToDate(dateString: string): Date {
    let parts = dateString.split(/[-\/]/);
    let day = +parts[0];
    let month = +parts[1] - 1; // mês é 0 baseado
    let year = +parts[2];
    return new Date(year, month, day);
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
}
