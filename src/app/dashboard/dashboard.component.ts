import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../data.service';
import { map } from 'rxjs/operators';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  analises = null;
  ok = null;
  quantidade = 50;
  qtAnalisetexto = null;
  qtAnalisecoment = null;
  lista2= [35];
  lista = [37]; 

  constructor(private DataService$: DataService) { }

  ngOnInit() {
    return this.DataService$.buscarDadosBD().subscribe(data => {
      this.analises = data;
      this.ok = data;
      console.log(this.analises)
    })

  }

  quantuser() {
    let cont = 0;
    for (let user of this.analises.usuarios) {
      if (user.nome != null) {
        cont = cont + 1
      }
    }
    return cont;
  }
  quantComentario() {
    let contaC = 0;
    for (let anal of this.analises.analises_geral) {
      if (anal.tipo_analise == "Análise de Comentários") {
        contaC = contaC + 1
        this.qtAnalisecoment = contaC
      }
    }
    return this.qtAnalisecoment;
  }
  quantTexto() {
    let contT = 0;
    for (let anal of this.analises.analises_geral) {
      if (anal.tipo_analise == "Análise de Texto") {
        contT = contT + 1
        this.qtAnalisetexto = contT

        this.lista2.push(contT)
      }
    }
    return this.qtAnalisetexto;
  }

  testao(){
    for (let teste of this.analises.analise_foto){
      return teste.tipoAnalise;
    }
    
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true

  };

  public barChartLabens = ['Analise Comentarios', 'Analise Texto'];
  public barChartType = 'pie';
  public barChartLegend = true;

  public barChartData = [
    { data: [this.lista, this.lista2], label: 'Series A' }
  ];

}
