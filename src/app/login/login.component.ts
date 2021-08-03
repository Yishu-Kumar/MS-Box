import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isSignUp: boolean = !false;
  form!: NgForm;
  formSubscription?: Subscription;
  response: any;
  message!: string;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.message = this.loginService.message;

    setTimeout(() => {

      this.message = ""

    }, 3000);
  }

  onSubmit(loginForm: NgForm) {

    this.form = loginForm;

    this.formSubscription = this.loginService.addLogin(this.form.value).subscribe(response => {

      this.response = response;

      this.loginService.currentLogin = loginForm.value;
      this.router.navigate(['']);
      
    }, error => {

      console.log(error);
      alert("Sorry! Something went wrong!!\nIf you are not sign up, then please sign up first!!");
    });
  }

  onClick() {
    this.router.navigate(['/signUp']);
  }

  ngOnDestroy(): void {
    this.formSubscription?.unsubscribe();
  }

}
