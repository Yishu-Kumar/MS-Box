import { Subscription } from 'rxjs';
import { SignUpService } from './../signup/signup.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SignUp } from '../signup/signup.model';
import { LoginService } from '../login/login.service';
import { Login } from '../login/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  profile!: SignUp;
  profileSubscription!: Subscription;
  currentLogin: Login = new Login("", "");
  isProfileLoading = false;
  deleteProfileSubscription?: Subscription;

  constructor(private loginService: LoginService, private signUpService: SignUpService, private router: Router) { }

  ngOnInit(): void {
    
    this.isProfileLoading = true;

    this.currentLogin = this.loginService.currentLogin;
    // console.log(this.currentLogin);

    this.profileSubscription = this.signUpService.getSignUpProfile(this.currentLogin.email).subscribe((response: SignUp) => {

      this.profile = response;
      this.isProfileLoading = false;

    }, error => {

      console.log("ERROR! Profile couldn't found: " + error);
    });
  }

  onUpdate(){
    
    const user = this.loginService.currentLogin;
    this.router.navigate([user.email + '/update-profile']);
  }

  onDelete() {

    confirm("Alert! Are you sure you want to signout or delete your profile ?");

    this.deleteProfileSubscription = this.signUpService.deleteProfile(this.profile.email).subscribe(response => {
      
      console.log(response);

      this.signUpService.message = "Success! You sign out successfully!!";
      this.router.navigate(['/signUp']);

    }, error => {

      console.log(error);
    });
  }

  ngOnDestroy(): void {

    this.profileSubscription.unsubscribe();
    this.deleteProfileSubscription?.unsubscribe();
  }

}
