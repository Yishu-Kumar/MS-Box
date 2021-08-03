import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SignUpService } from 'src/app/signup/signup.service';
import { SignUp } from 'src/app/signup/signup.model';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit, OnDestroy {
  subscription?: Subscription;
  profile!: SignUp;
  profileSubscription?: Subscription;
  updateProfileSubscription?: Subscription;

  constructor(private router: Router, private signUpService: SignUpService, private route: ActivatedRoute, 
              private loginService: LoginService) { }

  ngOnInit(): void {

    this.profileSubscription = this.route.params.subscribe((params: Params) => {

      const email = params['email'];
      // console.log(email);
      
      this.signUpService.getSignUpProfile(email).subscribe((signUp: SignUp) => {

        this.profile = signUp;
        // console.log(this.profile);

      }, error => {

        console.log(error);
      });
    })
  }

  onSubmit(setPasswordForm: NgForm) {

    // console.log(setPasswordForm.controls.password.value);
    this.profile.password = setPasswordForm.controls.password.value;

    this.updateProfileSubscription = this.signUpService.updateProfile(this.profile).subscribe(response => {

      // console.log(response);
      this.loginService.message = "New password has been set successfully...";
      this.router.navigate(['/login']);

    }, error => {

      console.log(error);
    });
  }

  onClick() {

    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.profileSubscription?.unsubscribe();
    this.updateProfileSubscription?.unsubscribe();
  }

}
