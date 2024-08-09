import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ConsultaService } from 'src/app/views/consulta/consulta.service';
import { CepimModel } from 'src/app/model/cepim.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { ActivatedRoute } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-historico-cepim',
  templateUrl: './historico-cepim.component.html',
  styleUrls: ['./historico-cepim.component.css'],
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
export class HistoricoCepimComponent implements OnInit {
  displayedColumns: string[] = ['id', 'dataReferencia', 'motivo', 'orgaoSuperior', 'pessoaJuridica', 'convenio', 'expand'];
  expandedElement: CepimModel | null = null;
  dataSource = new MatTableDataSource<CepimModel>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private route: ActivatedRoute,
    private consultaService: ConsultaService
  ) {}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      if (id) {
        this.consultaService.getDetailcepimById(id).subscribe({
          next: (data) => {
            console.log(data); // Verifique o formato dos dados retornados
            this.dataSource.data = Array.isArray(data) ? data : [data]; // Atualiza dataSource com o array de dados
          },
          error: (err) => {
            console.error('Erro ao carregar dados do CEPIM', err);
          }
        });
      }
    });  
  }

  toggleExtraInfo(element: CepimModel): void {
    this.expandedElement = this.expandedElement === element ? null : element;
  }
}
