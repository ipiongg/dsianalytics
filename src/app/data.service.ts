import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Analise } from './analise';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiURL = 'https://dsi-backend-integration.herokuapp.com';

  constructor(private _http: HttpClient) { }

  buscarDadosBD(){
    const url = `${this.apiURL}/analytics`

    return this._http.get(url);
  }
}