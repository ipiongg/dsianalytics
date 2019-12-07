import { Component, OnInit, ViewEncapsulation, ɵConsole } from '@angular/core';
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
  public barChartOptions
  public barChartLabens
  public barChartType
  public barChartLegend
  public barChartData

  analises = null;
  ok = null;
  quantidade = 50;
  qtAnalisetexto = null;
  qtAnalisecoment = null;
  vermelho = [];
  azul = [];
  loading = false

  public cont = 0;
  public contaC = 0;
  public contT = 0;

  constructor(public DataService$: DataService) { }

  ngOnInit() {
  this.buscarDados();
  }

  buscarDados() {
    this.loading = true
    this.DataService$.buscarDadosBD().subscribe(data => {
      this.analises = data;
      this.ok = data;
      

      for (let user of this.ok.usuarios) {
        if (user.usuario != null) {
          this.cont = this.cont + 1
        }
      }

      for (let analise of this.ok.analises_geral) {
        /*console.log(analise.analiseComentarios)*/
        if (analise.analiseComentarios != false) {
          this.contaC = this.contaC + 1
        }
      }
      this.vermelho.push(this.contaC)
      this.qtAnalisecoment = this.contaC

      for (let analise of this.ok.analises_geral) {
        if (analise.analiseLegenda != false) {
          this.contT = this.contT + 1
        }
      }

      this.qtAnalisetexto = this.contT
      this.azul.push(this.contT)
      this.dados()
      this.loading = false
    })
  }

  dados() {
    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true

    };

    this.barChartLabens = ['Analise Comentarios', 'Analise Texto'];
    this.barChartType = 'pie';
    this.barChartLegend = true;

    this.barChartData = [
      { data: [this.vermelho, this.azul], label: 'Analises' }
    ];
  }


}
