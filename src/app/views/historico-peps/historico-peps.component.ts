import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { PepsModel } from 'src/app/model/peps.model';
import { ConsultaService } from 'src/app/views/consulta/consulta.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-historico-peps',
  templateUrl: './historico-peps.component.html',
  styleUrls: ['./historico-peps.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({
        height: '0px',
        minHeight: '0',
        visibility: 'hidden',
        opacity: 0
      })),
      state('expanded', style({
        height: '100px',
        minHeight: '100px',
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
export class HistoricoPepsComponent implements OnInit {
  expandedElement: PepsModel | null = null;
  displayedColumns: string[] = ['cpf', 'nome', 'descricaoFuncao', 'nomeOrgao', 'dtInicioExercicio', 'dtFimExercicio', 'expand'];
  dataSource = new MatTableDataSource<PepsModel>([]); // Inicializa com um array vazio

  constructor(
    private route: ActivatedRoute,
    private consultaService: ConsultaService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      if (id) {
        this.consultaService.getDetailsById(id).subscribe({
          next: (data) => {
            console.log(data); // Verifique o formato dos dados retornados
            this.dataSource.data = Array.isArray(data) ? data : [data]; // Atualiza dataSource com o array de dados
          },
          error: (err) => {
            console.error('Erro ao carregar dados do PEPS', err);
          }
        });
      }
    });
  }

  toggleExtraInfo(element: PepsModel): void {
    this.expandedElement = this.expandedElement === element ? null : element;
  }
}
