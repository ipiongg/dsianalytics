import { Component, OnInit } from '@angular/core';
import { AnalisesService } from 'src/app/analises.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-esqueceu-senha',
  templateUrl: './esqueceu-senha.component.html',
  styleUrls: ['./esqueceu-senha.component.css']
})
export class EsqueceuSenhaComponent implements OnInit {
  public id: any;
  nickname = null;
  senha = null;
  constructor(
    private AnaliseService: AnalisesService, private router: Router
  ) { }

  ngOnInit() {
  }
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
