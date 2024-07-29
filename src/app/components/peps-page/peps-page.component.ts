import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-peps-page',
  templateUrl: './peps-page.component.html',
  styleUrls: ['./peps-page.component.css']
})
export class PepsPageComponent implements OnInit {
  data: any; // Altere para o tipo correto conforme o seu modelo

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        this.data = JSON.parse(params['data']);
        console.log('Dados na página de resultados:', this.data);
      }
    });
  }
}
