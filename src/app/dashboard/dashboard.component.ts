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

  teste() {
    document.querySelector("canvas").click();
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
        //console.log(analise.analiseComentarios)
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

      //console.log(this.vermelho)
    })

    return true
  }


  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true

  };

  public barChartLabens = ['Analise Comentarios', 'Analise Texto'];
  public barChartType = 'pie';
  public barChartLegend = true;
  
  public barChartData = [
    { data: [this.vermelho, this.azul], label: 'Analises' }
  ];
  
}
