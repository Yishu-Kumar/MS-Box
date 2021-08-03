import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { Login } from "./login.model";

@Injectable()
export class LoginService {
    login = new BehaviorSubject<any>(null);
    currentLogin: Login = new Login("", "");
    message!: string;

    constructor(private http: HttpClient) { }

    addLogin(login: Login) {

        this.login.next(login);
        localStorage.setItem("user", JSON.stringify(login));

        return this.http.post<Login>("http://localhost:8080/login", login);
    }

    logout(login: Login) {

        localStorage.removeItem("user");
        this.currentLogin = new Login("", "");

        return this.http.delete<Login>("http://localhost:8080/logout/" + login.email);
    }

    getLogin(email: string) {

        return this.http.get<Login>("http://localhost:8080/login/" + email);
    }

    autoLogin() {

        const user = localStorage.getItem("user");

        if (!user) {
            return;
        }

        this.currentLogin = JSON.parse(user);

        this.addLogin(this.currentLogin).subscribe((login: Login) => {

            this.login.next(login);
        });
    }

}

