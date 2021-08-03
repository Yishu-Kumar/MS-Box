import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Mail } from '../mail.model';
import { MailsService } from '../mails.service';
import { LoginService } from 'src/app/login/login.service';
import { Login } from 'src/app/login/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mails-list',
  templateUrl: './mails-list.component.html',
  styleUrls: ['./mails-list.component.css']
})
export class MailsListComponent implements OnInit, OnDestroy {
  mails: Mail[] = [];
  isMailsLoading = false;
  mailsSubscription?: Subscription;
  mailDeletedResponse?: string;
  user?: Login;

  constructor(private mailsService: MailsService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {

    this.mailDeletedResponse = this.mailsService.mailDeletedResponse;

    setTimeout(() => {

      this.mailDeletedResponse = '';

    }, 1000);

    this.isMailsLoading = true;
    this.user = this.loginService.currentLogin;

    this.mailsSubscription = this.mailsService.getAllMailsByUser(this.user.email).subscribe(mails => {

      this.mails = mails;
      this.isMailsLoading = false;
      // console.log(this.isMailsLoading);

    }, error => {

      console.log(error);
    });
  }

  onCompose() {

    this.router.navigate(['compose']);
  }

  ngOnDestroy(): void {
    this.mailsSubscription?.unsubscribe();
  }

}
