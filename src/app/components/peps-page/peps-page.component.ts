import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PepsModel } from './../../model/peps.model';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HeaderService } from '../template/header/header.service';
import { ConsultaService } from 'src/app/views/consulta/consulta.service';
import { ActivatedRoute } from '@angular/router';
import { DialogData } from 'src/app/model/dialog-data.model';

@Component({
  selector: 'app-peps-page',
  templateUrl: './peps-page.component.html',
  styleUrls: ['./peps-page.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({
        height: '0px',
        minHeight: '0',
        visibility: 'hidden',
        opacity: 0
      })),
      state('expanded', style({
        height: '100px', // Ajuste para a altura fixa desejada
        minHeight: '100px',
        visibility: 'visible',
        opacity: 1,
        borderRadius: '4px' // Opcional: arredondar as bordas
      })),
      transition('collapsed <=> expanded', [
        animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ]),
    ]),
  ]
})
export class PepsPageComponent implements OnInit {
  displayedColumns: string[] = ['cpf', 'nome', 'descricaoFuncao', 'nomeOrgao', 'dtInicioExercicio', 'dtFimExercicio', 'expand'];
  dataSource = new MatTableDataSource<PepsModel>();
  expandedElement: PepsModel | null = null;

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
        this.consultaService.getPepsByCpf(pesquisa).subscribe({
          next: (data: PepsModel[]) => {
            this.dataSource.data = data;
          },
          error: (err) => {
            console.error('Erro ao buscar dados:', err);
          }
        });
      }
    });
  }

  toggleExtraInfo(element: PepsModel): void {
    this.expandedElement = this.expandedElement === element ? null : element;
  }
}
