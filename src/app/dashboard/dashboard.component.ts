import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../data.service';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { AnalisesService } from 'src/app/analises.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DashboardComponent implements OnInit {

  canActivate() {
    return false;
}
  //Gráfico de Pizza
  public barChartOptions
  public barChartLabens
  public barChartType
  public barChartLegend
  public barChartData
  nombre = this.AnaliseService.nome
  
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };

  //Gráfico de Radar
  public legenda = [0, 0, 0, 0, 0, 0]
  public comentario = [0, 0, 0, 0, 0, 0]; 
  public historico = [0, 0, 0, 0, 0, 0]

  public felicidadeL = 0; medoL = 0; surpresaL = 0; tristezaL = 0;  raivaL = 0; nojoL = 0
  public felicidadeC = 0; medoC = 0; surpresaC = 0; tristezaC = 0;  raivaC = 0; nojoC = 0
  public label = ['Felicidade', 'Medo', 'Surpresa', 'Tristeza', 'Raiva', 'Nojo'] 

  public radarChartLabels: Label[] = this.label;
  public radarChartData: ChartDataSets[] = [
    //{ data: , label: 'Foto' },
    { data: this.legenda, label: 'Legenda' },
    { data: this.comentario, label: 'Comentários' },
  ];

  public radarChartType: ChartType = 'radar';
  
  //Outras variáveis
  analises = null;
  ok = null;
  quantidade = 50;
  vermelho = [];
  azul = [];
  loading = false

  public contU = 0; contC = 0; contL = 0; contF = 0;
  public qtd_analises_total = 0;

  constructor(
    public DataService$: DataService, private AnaliseService: AnalisesService
  ) { }

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
          this.contU = this.contU + 1
        }
      }

      //Análise de Fotos
      for (let foto of this.ok.analises_geral) {
        if (foto.analiseFoto != false) {
          this.contF = this.contF + 1
        }
      }

      //Análise de Textos
      for (let legenda of this.ok.analises_geral) {
        if (legenda.analiseLegenda != false) {
          this.contL = this.contL + 1
        }
        this.grafico_radar('Legenda', legenda.analiseLegenda.Resultado)
      }

      //Análise de Comentários
      for (let comentario of this.ok.analises_geral) {
        if (comentario.analiseComentarios != false) {
          this.contC += comentario.analiseComentarios.Lista_Frases.length

          //Cálculo para o Gráfico de Radar
          for (let media of comentario.analiseComentarios.Media) {
            let valor = 0
            let chave
            let i = 0
            for (let val of Object.values(media)) {
              if (val > valor) {
                valor = val
                chave = Object.keys(media)[i]
              }
              i++
            }

            i = 0
            for (let label of this.label) {
              if (chave == 'Media_'+label) {
                this.comentario[i] += 1
              }
              i++
            }
          }
        }
      }

      //Alguns sets
      this.vermelho.push(this.contC)
      this.azul.push(this.contL)
      this.dados()
      this.loading = false

      //Retorna a quatidade de análises realizadas
      this.qtd_analises_total = this.contL + this.contC + this.contF
    })
  }
  
  grafico_radar(flc, sentimento) {
    if (flc == 'Legenda') {
      if (sentimento == 'Felicidade') {
        this.legenda[0] += 1
      }
      else if (sentimento == 'Medo'){
        this.legenda[1] += 1
      }
      else if (sentimento == 'Surpresa'){
        this.legenda[2] += 1
      }
      else if (sentimento == 'Tristeza'){
        this.legenda[3] += 1
      }
      else if (sentimento == 'Raiva'){
        this.legenda[4] += 1
      }
      else if (sentimento == 'Nojo'){
        this.legenda[5] += 1
      }
    }
  }

  //Gráfico de Pizza
  dados() {
    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true
    };

    this.barChartLabens = ['Legenda','Comentario'];
    this.barChartType = 'horizontalBar';
    this.barChartLegend = true;

    this.barChartData = [
      { data: [this.contL], label:[ 'Legenda']},
      {data: [this.contC], label:['Comentarios']},
    ];
  }
}
