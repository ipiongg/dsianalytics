import { Component, OnInit, ViewEncapsulation, ɵConsole } from '@angular/core';
import { DataService } from '../data.service';
import { map } from 'rxjs/operators';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DashboardComponent implements OnInit {
  //Gráfico de Pizza
  public barChartOptions
  public barChartLabens
  public barChartType
  public barChartLegend
  public barChartData

  //Gráfico Radar
  
  
  public felicidade = [0, 0, 0]; surpresa = [0, 0, 0]; medo = [0, 0, 0]; tristeza = [0, 0, 0]; raiva = [0, 0, 0]; nojo = [0, 0, 0]
  public felicidadeF; surpresaF; medoF; tristezaF; raivaF; nojoF
  public felicidadeL; surpresaL; medoL; tristezaL; raivaL; nojoL
  public felicidadeC; surpresaC; medoC; tristezaC; raivaC; nojoC
  
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['Felicidade', 'Surpresa', 'Medo', 'Tristeza', 'Raiva', 'Nojo'];
  public radarChartData: ChartDataSets[] = [
    { data: [this.felicidadeF, this.surpresaF, this.medoF, this.tristezaF, this.raivaF, this.nojoF], label: 'Foto' },
    { data: [this.felicidadeL, this.surpresaL, this.medoL, this.tristezaL, this.raivaL, this.nojoL], label: 'Legenda' },
    { data: [this.felicidadeC, this.surpresaC, this.medoC, this.tristezaC, this.raivaC, this.nojoC], label: 'Comentários' },
  ];

  public radarChartType: ChartType = 'radar';

  //Outras variáveis
  analises = null;
  ok = null;
  quantidade = 50;
  qtAnaliseLegenda = null;
  qtAnaliseComent = null;
  vermelho = [];
  azul = [];
  loading = false

  public contU = 0; contC = 0; contL = 0; contF = 0;
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
          this.contU = this.contU + 1
        }
        console.log(this.radarChartData)
      }

      //Análise de Fotos
      for (let foto of this.ok.analises_geral) {
        if (foto.analiseFoto != false) {
          this.contF = this.contF + 1
          //console.log(foto.analiseFoto)
        }
      } 

      //Análise de Textos
      for (let legenda of this.ok.analises_geral) {
        if (legenda.analiseLegenda != false) {
          this.contL = this.contL + 1
          //console.log(texto.analiseLegenda.Resultado)
        }
        this.grafico_radar('Legenda', legenda.analiseLegenda.Resultado)
      }

      //Análise de Comentários
      for (let comentario of this.ok.analises_geral) {
        if (comentario.analiseComentarios != false) {
          this.contC = this.contC + 1
          //console.log(analise.analiseComentarios)

        }
      }

      this.vermelho.push(this.contC)
      this.qtAnaliseComent = this.contC

      this.qtAnaliseLegenda = this.contL
      this.azul.push(this.contL)
      this.dados()
      this.loading = false

      //Retorna a quatidade de análises realizadas
      this.qtd_analises_total = this.contL + this.contC + this.contF
    })
  }

  grafico_radar(flc, sentimento){
    if (flc == 'Foto') {
      if (sentimento == 'Felicidade') {
        
      }
      else if (sentimento == 'Surpresa'){

      }
      else if (sentimento == 'Medo'){
  
      }
      else if (sentimento == 'Tristeza'){
  
      }
      else if (sentimento == 'Raiva'){
  
      }
      else if (sentimento == 'Nojo'){
  
      }

    else if (flc == 'Legenda') {
      if (sentimento == 'Felicidade') {
        this.felicidade[1] += 1
        this.felicidadeF = this.felicidade[1]*100/this.contL
      }
      else if (sentimento == 'Surpresa'){

      }
      else if (sentimento == 'Medo'){
  
      }
      else if (sentimento == 'Tristeza'){
  
      }
      else if (sentimento == 'Raiva'){
  
      }
      else if (sentimento == 'Nojo'){
  
      }
    }

    else if (flc == 'Comentário') {
      if (sentimento == 'Felicidade') {

      }
      else if (sentimento == 'Surpresa'){

      }
      else if (sentimento == 'Medo'){
  
      }
      else if (sentimento == 'Tristeza'){
  
      }
      else if (sentimento == 'Raiva'){
  
      }
      else if (sentimento == 'Nojo'){
  
      }
    }
  }

    /*
    if (texto.analiseLegenda.Resultado == 'Felicidade'){

    }
    else if (texto.analiseLegenda.Resultado == 'Surpresa'){

    }
    else if (texto.analiseLegenda.Resultado == 'Medo'){

    }
    else if (texto.analiseLegenda.Resultado == 'Tristeza'){

    }
    else if (texto.analiseLegenda.Resultado == 'Raiva'){

    }
    else if (texto.analiseLegenda.Resultado == 'Nojo'){

    }
    */
  }


  //Gráfico de Pizza
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

  //Gráfico Radar
  /*dados2() {
    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true

    };

    this.barChartLabens = ['Analise Comentarios', 'Analise Texto'];
    this.barChartType = 'radar';
    this.barChartLegend = true;

    this.barChartData = [
      { data: [this.vermelho, this.azul], label: 'Analises' }
    ];
  }*/

  /*
  dados2() {
    this.myRadarChart = new Chart(ctx, {
      type: 'radar',
      data: data,
      options: options
  });
}
  */

  //Gráfico Radar
  public chartClicked({ event, active }: {
      event: MouseEvent, 
      active: {}[] }): 
        void {
          console.log(event, active);
        }

  public chartHovered({ event, active }: { 
    event: MouseEvent, 
    active: {}[] }): 
      void {
        console.log(event, active);
      }
}
