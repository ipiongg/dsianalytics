import { Component, OnInit } from '@angular/core';
import { AnalisesService } from 'src/app/analises.service';
import { Router } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public id: any;
  nickname = null;
  senha = null;

  constructor(
    private AnaliseService: AnalisesService, private router: Router
  ) { }

  ngOnInit() { }

  async login(formLogin) {
    let response = await this.AnaliseService.efetuarLogin(this.nickname, this.senha).subscribe(res => {
      this.id = res;
      console.log(this.id.login)
      if (this.id.login) {
        this.router.navigate(['dashboard'])
        console.log(this.id);
      }
      else {
        console.log("Error")
      }

    });
    formLogin.reset()
  };


}
