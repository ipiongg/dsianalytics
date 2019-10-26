import { Injectable } from '@angular/core';
import { Pessoa } from 'src/app/pessoa';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalisesService {
  apiURL = "http://dsi-backend-integration.herokuapp.com";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private _http: HttpClient) {}

  efetuarLogin(nickname, senha): Observable<Pessoa> {
    const url = ` ${this.apiURL}/login`

    const newHeader = this.httpOptions.headers.set('nickname', nickname).append("senha", senha);
    console.log(newHeader);
    return this._http.get<Pessoa>(url, { headers: newHeader });
  };

}
