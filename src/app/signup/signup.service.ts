import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { LoginService } from '../login/login.service';
import { SignUp } from './signup.model';

@Injectable()
export class SignUpService {
    signin!: SignUp;
    message!: string;
    otp!: number;

    constructor(private http: HttpClient, private loginService: LoginService) {}

    signUp(signUp: SignUp) {

        return this.http.post("http://localhost:8080/signUp", signUp);
    }

    getSignUpProfile(email: string) {

        return this.http.get<SignUp>("http://localhost:8080/signUp/" + email);
    }

    updateProfile(signUp: SignUp) {
        
        return this.http.put("http://localhost:8080/updateProfile", signUp);
    }

    deleteProfile(email: string) {

        const user = this.loginService.currentLogin;

        this.loginService.logout(user).subscribe(response => {
            
            console.log(response);
            
        }, error => {

            console.log(error);
        });
        
        return this.http.delete("http://localhost:8080/signOut/" + email);
    }
    
    forgotPassword(email: string) {

        return this.http.post("http://localhost:8080/forgot-password", email);
    }
}

