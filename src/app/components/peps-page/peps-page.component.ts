import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataService } from './../../data-service.service';

@Component({
  selector: 'app-peps-page',
  templateUrl: './peps-page.component.html',
  styleUrls: ['./peps-page.component.css']
})
export class PepsPageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['documentValue', 'nome', 'funcao', 'orgao', 
  'dtInicioExercicio', 'dtFimExercicio', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  expandedElement: any | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    const data = this.dataService.getApiData();
    this.dataSource.data = data;

    // No need to configure paginator and sort here
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  toggleExtraInfo(element: any) {
    this.expandedElement = this.expandedElement === element ? null : element;
  }
}
