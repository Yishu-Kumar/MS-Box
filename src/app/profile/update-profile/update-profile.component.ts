import { Subscription } from 'rxjs';
import { SignUp } from './../../signup/signup.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/login/login.service';
import { SignUpService } from 'src/app/signup/signup.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit, OnDestroy {
  profileForm!: FormGroup;
  email!: string;
  signUpProfileSubscription?: Subscription;
  profileFormSubscription?: Subscription;
  message!: string;

  constructor(private loginService: LoginService, private signUpService: SignUpService, private router: Router, 
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {

      this.email = params['email'];

      this.initForm();
    });
  }

  private initForm() {

    let name = '';
    let gender = '';
    let dateOfBirth = '';
    let email = '';
    let password = '';
    let phoneNumber = 0;

    this.signUpProfileSubscription = this.signUpService.getSignUpProfile(this.email).subscribe((signUp: SignUp) => {
      
      this.profileForm = new FormGroup({
        'name': new FormControl(signUp.name, Validators.required),
        'gender': new FormControl(signUp.gender, Validators.required),
        'dateOfBirth': new FormControl(signUp.dateOfBirth, Validators.required),
        'email': new FormControl(signUp.email, [Validators.required, Validators.email]),
        'password': new FormControl(signUp.password, Validators.required),
        'phoneNumber': new FormControl(signUp.phoneNumber, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      });

    }, error => {
      
      console.log(error);
    });

    this.profileForm = new FormGroup({
        'name': new FormControl(name, Validators.required),
        'gender': new FormControl(gender, Validators.required),
        'dateOfBirth': new FormControl(dateOfBirth, Validators.required),
        'email': new FormControl(email, [Validators.required, Validators.email]),
        'password': new FormControl(password, Validators.required),
        'phoneNumber': new FormControl(phoneNumber, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
    });
  }

  onSubmit() {

    if(this.profileForm.invalid) {
      
      this.message = "Sorry! Something went wrong!!";

      return;
    }
    
    confirm("Alert! Are you sure you want to change your profile ?");
    this.profileFormSubscription = this.signUpService.updateProfile(this.profileForm.value).subscribe(response => {

      // console.log(this.profileForm.value);
      this.loginService.message = "Success! Your profile updated successfully!!";

    }, error => {

      this.message = "Please enter the all information correctly!!";
      console.log(error);
      return;
    });

    this.router.navigate(['/login']);
  }

  onCancel() {

    this.router.navigate(['profile']);
  }

  ngOnDestroy(): void {

    this.profileFormSubscription?.unsubscribe();
    this.signUpProfileSubscription?.unsubscribe();
  }

}
