import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SignUpService } from '../signup/signup.service';
import { SignUp } from '../signup/signup.model';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit, OnDestroy {
  changePasswordForm!: NgForm;
  signUp!: SignUp;
  signUpSubscription?: Subscription;
  formSubscription?: Subscription;
  message!: string;

  constructor(private loginService: LoginService, private signUpService: SignUpService, private router: Router) { }

  ngOnInit(): void {
    
    const user = this.loginService.currentLogin;

    this.signUpSubscription = this.signUpService.getSignUpProfile(user.email).subscribe((signUp: SignUp) => {

      this.signUp = signUp;

    }, error => {

      console.log(error);
    });

    console.log(this.signUp);
  }

  onSubmit(newPasswordForm: NgForm) {

    this.changePasswordForm = newPasswordForm;
    
    if(newPasswordForm.controls.newPassword.value != newPasswordForm.controls.confirmPassword.value) {

      this.message = 'New password and Confirm password fields must contain same value!!';

      return;
    }

    const password = this.changePasswordForm.controls.newPassword.value;

    this.signUp = new SignUp(this.signUp.name, this.signUp.gender, this.signUp.dateOfBirth, this.signUp.email, 
                             password, this.signUp.phoneNumber);

    this.formSubscription = this.signUpService.updateProfile(this.signUp).subscribe(response => {
      
      const user = JSON.parse(localStorage.getItem('user')!);

      this.loginService.logout(user).subscribe(response => {

        console.log(response);
        this.loginService.message = 'Success! Your password has been changed successfully!!\n Login up using new password...';
        this.router.navigate(['/login']);

      }, error => {

        console.log(error);
      });

    }, error => {

      console.log(error);
    })
  }

  ngOnDestroy(): void {

    this.signUpSubscription?.unsubscribe();
    this.formSubscription?.unsubscribe();
  }

}
