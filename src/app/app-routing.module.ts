import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NewComponent } from './mails/new/new.component';
import { MailDetailsComponent } from './mails/mail-item/mail-details/mail-details.component';
import { MailsListComponent } from './mails/mails-list/mails-list.component';
import { SettingsComponent } from './settings/settings.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from "./login/login.component";
import { NavComponent } from './nav/nav.component';
import { LoginGuard } from './login/login-guard';
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component';
import { FormsModule } from '@angular/forms';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OtpVerificationComponent } from './forgot-password/otp-verification/otp-verification.component';
import { SetPasswordComponent } from './forgot-password/set-password/set-password.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent},
    {
        path: '', component: NavComponent, canActivate: [LoginGuard], children: [
            { path: 'mails', component: MailsListComponent },
            { path: 'mail/:id/details', component: MailDetailsComponent },
            { path: 'compose', component: NewComponent },
            { path: 'new', redirectTo: 'compose' },
            { path: 'settings', component: SettingsComponent },
            { path: 'profile', component: ProfileComponent },
            { path: ':email/update-profile', component: UpdateProfileComponent },
            { path: 'new-password', component: NewPasswordComponent },
        ]
    },
    { path: 'signUp', component: SignupComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: ':email/otp-verification', component: OtpVerificationComponent },
    { path: ':email/set-password', component: SetPasswordComponent },
    { path: '**', redirectTo: 'login'},
]

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}

