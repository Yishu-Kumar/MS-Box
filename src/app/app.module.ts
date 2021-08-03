import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MailsComponent } from './mails/mails.component';
import { MailsListComponent } from './mails/mails-list/mails-list.component';
import { MailItemComponent } from './mails/mail-item/mail-item.component';
import { MailDetailsComponent } from './mails/mail-item/mail-details/mail-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatRadioModule} from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { NewComponent } from './mails/new/new.component';
import { LoginService } from './login/login.service';
import { SettingsComponent } from './settings/settings.component';
import { MatInputModule } from '@angular/material/input';
import { SignupComponent } from './signup/signup.component';
import { MailsService } from './mails/mails.service';
import { ProfileComponent } from './profile/profile.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { HttpClientModule } from '@angular/common/http';
import { SignUpService } from './signup/signup.service';

import { SocialLoginModule, SocialAuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { HomeComponent } from './home/home.component';
import { DataLoadingSpinnerComponent } from './shared/data-loading-spinner/data-loading-spinner.component';
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OtpVerificationComponent } from './forgot-password/otp-verification/otp-verification.component';
import { SetPasswordComponent } from './forgot-password/set-password/set-password.component';

@NgModule({
  declarations: [
    AppComponent,
    MailsComponent,
    MailsListComponent,
    MailItemComponent,
    MailDetailsComponent,
    NavComponent,
    LoginComponent,
    NewComponent,
    SettingsComponent,
    SignupComponent,
    ProfileComponent,
    LoadingSpinnerComponent,
    HomeComponent,
    DataLoadingSpinnerComponent,
    UpdateProfileComponent,
    NewPasswordComponent,
    ForgotPasswordComponent,
    OtpVerificationComponent,
    SetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    LayoutModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    AppRoutingModule,
    MatInputModule,
    MatRadioModule,
    EditorModule,
    HttpClientModule,
    SocialLoginModule,
  ],
  providers: [NavComponent, MailsService, LoginService, SignUpService,
    // {
    //   provide: 'SocialAuthServiceConfig',
    //   useValue: {
    //     autoLogin: false,
    //     providers: [
    //       {
    //         id: GoogleLoginProvider.PROVIDER_ID,
    //         provider: new GoogleLoginProvider('clientId')
    //       },
    //       // {
    //       //   id: FacebookLoginProvider.PROVIDER_ID,
    //       //   provider: new FacebookLoginProvider('clientId')
    //       // }
    //     ]
    //   } as SocialAuthServiceConfig,
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
