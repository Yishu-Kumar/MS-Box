import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SignUpService } from 'src/app/signup/signup.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements OnInit, OnDestroy {
  email!: string;
  subscription?: Subscription;

  constructor(private router: Router, private signUpService: SignUpService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.subscription = this.route.params.subscribe((params: Params) => {

      this.email = params['email'];
    });
  }

  onSubmit(otpVerifyForm: NgForm) {
    
    const otp = this.signUpService.otp;
    // console.log(otp);

    if(otpVerifyForm.controls.otp.value == otp) {

      this.router.navigate(['/' + this.email + '/set-password']);
    }
  }

  onClick() {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
