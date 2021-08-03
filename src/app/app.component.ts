import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isLogin: boolean = false;

  title = 'MailSender';

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.autoLogin();
  }

  ngOnDestroy(): void {
    
    const login = this.loginService.currentLogin;

    this.loginService.logout(login);
  }
}
