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
  public contC = 0;
  public contT = 0;
  public contF = 0;
  public qtd_analises_total = 0;

  constructor(public DataService$: DataService) { }

  ngOnInit() {
  this.buscarDados();
  }

  buscarDados() {
    this.loading = true
    this.DataService$.buscarDadosBD().subscribe(data => {
      this.analises = data;
      this.ok = data;
      console.log(this.analises.analises_geral)

      for (let user of this.ok.usuarios) {
        if (user.usuario != null) {
          this.cont = this.cont + 1
        }
      }

      //Análise de Textos
      for (let analise of this.ok.analises_geral) {
        if (analise.analiseLegenda != false) {
          this.contT = this.contT + 1
          //console.log(analise.analiseLegenda)
        }
      }

      //Análise de Comentários
      for (let analise of this.ok.analises_geral) {
        if (analise.analiseComentarios != false) {
          this.contC = this.contC + 1
          //console.log(analise.analiseComentarios)

        }
      }
      this.vermelho.push(this.contC)
      this.qtAnalisecoment = this.contC

      //Análise de Fotos
      for (let analise of this.ok.analises_geral) {
        if (analise.analiseFoto != false) {
          this.contF = this.contF + 1
          //console.log(analise.analiseFoto)
        }
      } 

      this.qtAnalisetexto = this.contT
      this.azul.push(this.contT)
      this.dados()
      this.loading = false

      //Retorna a quatidade de análises realizadas
      this.qtd_analises_total = this.contT + this.contC + this.contF
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
