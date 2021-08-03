import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Login } from 'src/app/login/login.model';
import { LoginService } from 'src/app/login/login.service';
import { MailsService } from '../mails.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit, OnDestroy {
  newForm!: NgForm;
  sendSubscription?: Subscription;
  response: any;
  user!: Login;

  constructor(private mailsService: MailsService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.loginService.currentLogin;
  }

  onSubmit(newForm: NgForm) {
    this.newForm = newForm;
    console.log(this.newForm.value);

    this.sendSubscription = this.mailsService.sendMail(newForm.value).subscribe(response => {

      this.response = response;
      
      this.router.navigate(['/mails']);

    }, error => {

      alert('Sorry! Something went wrong!!');
    });
  }

  ngOnDestroy(): void {
    this.sendSubscription?.unsubscribe();
  }

}
