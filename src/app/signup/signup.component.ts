import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService } from './signup.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  signUpForm!: NgForm;
  signUpSubscription?: Subscription;
  signOutMessage!: string;
  signinError!: string;

  constructor(private router: Router, private signUpService: SignUpService, private loginService: LoginService) { }

  ngOnInit(): void {

    this.signOutMessage = this.signUpService.message;
  }

  onSubmit(signUpForm: NgForm) {

    this.signUpForm = signUpForm;
    console.log(signUpForm.value);

    this.signUpSubscription = this.signUpService.signUp(signUpForm.value).subscribe(response => {
      
      this.loginService.message = "Success! You are sign in successfully!!";

      localStorage.clear();
      this.onClick();
      
    }, error => {

      console.log("ERROR: " + error);
      this.signinError = "Sorry! Something went wrong, please fill the valid information!!";
    });
  }

  onClick() {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.signUpSubscription?.unsubscribe();
  }

}
