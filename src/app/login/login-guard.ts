import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { LoginService } from './login.service';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(private loginService: LoginService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return this.loginService.login.pipe(take(1), map(user => {

            const isLogin = !!user;

            if (isLogin) {

                return true;
            }

            return this.router.createUrlTree(['/login']);
        }));
    }

}

