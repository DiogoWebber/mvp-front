import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CepimModel } from 'src/app/model/cepim.model'; // Verifique o caminho correto
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HeaderService } from '../template/header/header.service';
import { ConsultaService } from 'src/app/views/consulta/consulta.service';
import { ActivatedRoute } from '@angular/router';
import { DialogData } from 'src/app/model/dialog-data.model';

@Component({
  selector: 'app-cepim-page',
  templateUrl: './cepim-page.component.html',
  styleUrls: ['./cepim-page.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({
        height: '0px',
        minHeight: '0',
        visibility: 'hidden',
        opacity: 0
      })),
      state('expanded', style({
        height: '*',
        visibility: 'visible',
        opacity: 1,
        borderRadius: '4px'
      })),
      transition('collapsed <=> expanded', [
        animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ]),
    ]),
  ]
})
export class CepimPageComponent implements OnInit {
  displayedColumns: string[] = ['id', 'dataReferencia', 'motivo', 'orgaoSuperior', 'pessoaJuridica', 'convenio', 'expand'];
  dataSource = new MatTableDataSource<CepimModel>();
  expandedElement: CepimModel | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private consultaService: ConsultaService,
    private headerService: HeaderService,
    private route: ActivatedRoute
  ) {
    this.headerService.headerData = {
      title: 'Poder Executivo Federal',
      icon: '',
      routeUrl: ''
    };
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const pesquisa: DialogData = params as DialogData;
      if (pesquisa) {
        this.consultaService.getCepimByCnpj(pesquisa).subscribe({
          next: (data: CepimModel[]) => {
            this.dataSource.data = data;
          },
          error: (err) => {
            console.error('Erro ao buscar dados:', err);
          }
        });
      }
    });
  }

 

  toggleExtraInfo(element: CepimModel): void {
    this.expandedElement = this.expandedElement === element ? null : element;
  }
}
