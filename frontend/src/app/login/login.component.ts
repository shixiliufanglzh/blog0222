import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../core/services/config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userName = '';
  password = '';
  constructor(
    private http: HttpClient,
    private router: Router,
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
  }

  login() {
    const url = this.configService.serviceUrl + '/api/user/login';
    this.http.post(url, {
      userName: this.userName,
      password: this.password
    }).subscribe((result: any) => {
      console.log('login result: ', result)
      if (result && result.errNo === 0) {
        this.configService.currentUser = result.data;
        this.router.navigate(['/blog/blogs']);
      } else {
        alert(result ? result.message : '意外的错误' );
      }
    })
  }

}
