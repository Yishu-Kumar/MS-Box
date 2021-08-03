import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  doLogin?: boolean = false;
  isLogin: boolean = true;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private loginService: LoginService) {}

  logout() {
    this.doLogin = true;
    this.isLogin = false;

    const user = this.loginService.currentLogin;
    this.loginService.logout(user);
    
    this.loginService.message = "You logged out successfully!!";
    this.router.navigate(['/login']);
  }

}
