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
  vermelho= [];
  azul = 50; 
  loading = null

  constructor(public DataService$: DataService) { }

  ngOnInit() {
    this.loading = this.buscarDados();

  }

  async buscarDados() {
    await this.DataService$.buscarDadosBD().subscribe(data => {
      this.analises = data;
      this.ok = data;
      let cont = 0;
      let contaC = 0;
      let contT = 0;

      for (let user of this.ok.usuarios){
        if(user.usuario != null){
          cont = cont+1
        }
      }
      this.vermelho.push(cont)

      for (let analise of this.ok.analises_geral) {
        /*console.log(analise.analiseComentarios)*/
        if(analise.analiseComentarios != false){
          contaC = contaC +1
        }
      }
      this.qtAnalisecoment = contaC

      for (let analise of this.ok.analises_geral){
        if(analise.analiseLegenda != false){
          contT = contT+1
        }
      }
      this.qtAnalisetexto = contT
      this.dados()

    })
    return true
  }

  dados(){


    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true
  
    };
  
    this.barChartLabens = ['Analise Comentarios', 'Analise Texto'];
    this.barChartType= 'pie';
    this.barChartLegend= true;
  
    this.barChartData= [
      { data: [this.vermelho, this.azul], label: 'Analises' }
    ];
  }


}
