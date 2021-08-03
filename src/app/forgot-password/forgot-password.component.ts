import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpService } from '../signup/signup.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  formSubscription?: Subscription;
  email!: string;

  constructor(private router: Router, private signUpService: SignUpService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {

    this.email = form.controls['email'].value;
    // console.log(this.email);

    this.formSubscription = this.signUpService.forgotPassword(this.email).subscribe(response => {

      // console.log(response);
      this.signUpService.otp = +response;
      // console.log(this.signUpService.otp);

      this.router.navigate(['/' + this.email + '/otp-verification']);

    }, error => {

      console.log(error);
    });
  }

  onClick() {

    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.formSubscription?.unsubscribe();
  }

}
