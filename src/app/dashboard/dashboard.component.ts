import { Component, OnInit, ViewEncapsulation, ɵConsole, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { map } from 'rxjs/operators';
import { ChartDataSets, ChartType, RadialChartOptions, ChartOptions } from 'chart.js';
import { Label, Color, BaseChartDirective } from 'ng2-charts';
import { AnalisesService } from 'src/app/analises.service';
import { CanActivate } from '@angular/router';

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

  public radarChartLabels: Label[] = ['Felicidade', 'Medo', 'Surpresa', 'Tristeza', 'Raiva', 'Nojo'];
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
  qtAnaliseLegenda = null;
  qtAnaliseComent = null;
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
        //console.log(this.radarChartData)
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
          console.log(comentario.analiseComentarios.Media)
          for (let media of comentario.analiseComentarios.Media) {
            if (media.Media_Felicidade > media.Media_Surpresa && media.Media_Felicidade > media.Media_Tristeza && 
                media.Media_Felicidade > media.Media_Medo && media.Media_Felicidade > media.Media_Raiva && 
                media.Media_Felicidade > media.Media_Nojo){

              /*//console.log(0)
              this.historico[0] += media.Media_Felicidade
              //this.comentario[0] = this.historico[0]*100/this.porcentagem(media.Media_Felicidade)
              this.porcentagem()
              this.calculo()
              //this.historico[0] = media.Media_Felicidade
              //this.comentario[0] = (this.comentario[0]+media.Media_Felicidade)*100/teste*/

              this.comentario[0] += 1
            }

            else if(media.Media_Medo > media.Media_Felicidade && media.Media_Medo > media.Media_Tristeza && 
              media.Media_Medo > media.Media_Surpresa && media.Media_Medo > media.Media_Raiva && 
              media.Media_Medo > media.Media_Nojo){
            //console.log(3)
            /*this.historico[1] += media.Media_Medo
            //this.comentario[1] = this.historico[1]*100/
            this.porcentagem()
            this.calculo()
            //this.historico[3] += media.Media_Medo
            //this.comentario[3] = media.Media_Medo*100/teste*/

            this.comentario[1] += 1
            }
            else if(media.Media_Surpresa > media.Media_Felicidade && media.Media_Surpresa > media.Media_Tristeza && 
                    media.Media_Surpresa > media.Media_Medo && media.Media_Surpresa > media.Media_Raiva && 
                    media.Media_Surpresa > media.Media_Nojo){
              /*//console.log(1)
              this.historico[2] += media.Media_Surpresa
              //this.comentario[2] += media.Media_Surpresa*100/
              this.porcentagem()
              this.calculo()*/
              this.comentario[2] += 1
            }
            else if(media.Media_Tristeza > media.Media_Felicidade && media.Media_Tristeza > media.Media_Surpresa && 
                    media.Media_Tristeza > media.Media_Medo && media.Media_Tristeza > media.Media_Raiva && 
                    media.Media_Tristeza > media.Media_Nojo){
              /*//console.log(2)
              this.historico[3] += media.Media_Tristeza
              //this.comentario[3] += media.Media_Tristeza*100/
              this.porcentagem()
              this.calculo()*/
              this.comentario[3] += 1
            }
          
            else if(media.Media_Raiva > media.Media_Felicidade && media.Media_Raiva > media.Media_Tristeza && 
                    media.Media_Raiva > media.Media_Medo && media.Media_Raiva > media.Media_Surpresa && 
                    media.Media_Raiva > media.Media_Nojo){
              /*//console.log(4)
              this.historico[4] += media.Media_Raiva
              //this.comentario[4] += media.Media_Raiva*100/
              this.porcentagem()
              this.calculo()*/
              this.comentario[4] += 1
            }
            else if(media.Media_Nojo > media.Media_Felicidade && media.Media_Nojo > media.Media_Tristeza && 
                    media.Media_Nojo > media.Media_Medo && media.Media_Nojo > media.Media_Raiva && 
                    media.Media_Nojo > media.Media_Surpresa){
              /*//console.log(5)
              this.historico[5] += media.Media_Nojo
              //this.comentario[5] += media.Media_Nojo*100/
              this.porcentagem()
              this.calculo()*/
              this.comentario[5] += 1
            }
          }
        }
      }

      this.vermelho.push(this.contC)
      this.qtAnaliseComent = this.contC

      this.qtAnaliseLegenda = this.contL
      this.azul.push(this.contL)
      this.dados()
      //this.dados2()
      this.loading = false

      //Retorna a quatidade de análises realizadas
      this.qtd_analises_total = this.contL + this.contC + this.contF
    })
  }

  calculo(){
    let i = 0 
    while (i < 6) {
      this.comentario[i] = this.historico[i]*100/this.porcentagem()
      i++
    }
  }

  porcentagem(){
    console.log(this.historico)
    console.log(this.comentario)
    if ((this.comentario[0]+this.comentario[1]+this.comentario[2]+this.comentario[3]+this.comentario[4]+this.comentario[5]) == 0) {
      console.log(this.comentario[0]+this.comentario[1]+this.comentario[2]+this.comentario[3]+this.comentario[4]+this.comentario[5])
      return 100
    }
    else {
      console.log(this.comentario[0]+this.comentario[1]+this.comentario[2]+this.comentario[3]+this.comentario[4]+this.comentario[5])
      return this.comentario[0]+this.comentario[1]+this.comentario[2]+this.comentario[3]+this.comentario[4]+this.comentario[5]
    }
  }
  
  grafico_radar(flc, sentimento) {
    if (flc == 'Legenda') {
      if (sentimento == 'Felicidade') {
        this.felicidadeL += 1
        this.legenda[0] = this.felicidadeL*100/this.contL
        //console.log(this.felicidadeL, this.contL, this.felicidadeL*100/this.contL)
        console.log('felicidade')
      }
      else if (sentimento == 'Surpresa'){
        this.surpresaL += 1
        this.legenda[1] = this.surpresaL[1]*100/this.contL
        console.log('surpresa')
      }
      else if (sentimento == 'Tristeza'){
        this.tristezaL += 1
        this.legenda[3] = this.tristezaL[1]*100/this.contL
        console.log('tristeza')
      }
      else if (sentimento == 'Medo'){
        this.raivaL += 1
        this.legenda[2] = this.raivaL[1]*100/this.contL
        console.log('medo')
      }
      else if (sentimento == 'Raiva'){
        this.raivaL += 1
        this.legenda[4] = this.raivaL[1]*100/this.contL
        console.log('raiva')
      }
      else if (sentimento == 'Nojo'){
        this.nojoL += 1
        this.legenda[5] = this.nojoL[1]*100/this.contL
        console.log('nojo')
      }
    }
  }

  //Gráfico de Pizza
  dados() {
    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true

    };

    this.barChartLabens = ['Comentário','Legenda'];
    this.barChartType = 'pie';
    this.barChartLegend = true;
    

    this.barChartData = [
      
      { data: [this.vermelho, this.azul], label:[ 'Comentarios']},
     
    ];
  }
}
