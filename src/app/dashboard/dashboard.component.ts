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
  lista2= 0;
  lista = 0; 

  constructor(private DataService$: DataService) { }

  ngOnInit() {
    return this.DataService$.buscarDadosBD().subscribe(data => {
      this.analises = data;
      this.ok = data;
      
    })

  }

  quantuser() {
    let cont = 0;
    /*console.log(this.analises)*/
    for (let user of this.analises.usuarios){
      if(user.usuario != null){
        cont = cont+1
      }
    }
    
    this.lista2=cont
    return cont
  }
  quantComentario() {
    let contaC = 0;
    
    for (let analise of this.analises.analises_geral) {
      /*console.log(analise.analiseComentarios)*/
      if(analise.analiseComentarios != false){
        contaC = contaC +1
      }
    }
    return contaC  
    
  }
  
    
  quantTexto() {
    let contT = 0;
    /*console.log(this.analises.analises_geral)*/ 
    for (let analise of this.analises.analises_geral){
      if(analise.analiseLegenda != false){
        contT = contT+1
      }
    }
    
    return contT 
  }

  

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true

  };

  public barChartLabens = ['Analise Comentarios', 'Analise Texto'];
  public barChartType = 'pie';
  public barChartLegend = true;

  public barChartData = [
    { data: [30, 50], label: 'Analises' }
  ];

}
