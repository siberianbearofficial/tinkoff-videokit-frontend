import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LandingPageComponent} from './presentation/pages/landing-page/landing-page.component';
import {AdminPageComponent} from './presentation/pages/admin-page/admin-page.component';
import {ChangePasswordPageComponent} from './presentation/pages/change-password-page/change-password-page.component';
import {SignInPageComponent} from './presentation/pages/sign-in-page/sign-in-page.component';
import {SignUpPageComponent} from './presentation/pages/sign-up-page/sign-up-page.component';
import {UnknownPageComponent} from './presentation/pages/unknown-page/unknown-page.component';
import {GenerateVideoPageComponent} from './presentation/pages/generate-video-page/generate-video-page.component';
import {VideoPlayerComponent} from './presentation/shared/components/video-player/video-player.component';
import {
  DeleteAccountModalComponent
} from './presentation/shared/components/delete-account-modal/delete-account-modal.component';
import {DeleteUserModalComponent} from './presentation/shared/components/delete-user-modal/delete-user-modal.component';
import {UsersListComponent} from './presentation/shared/components/users-list/users-list.component';
import {AuthenticationInterceptor} from "./presentation/shared/interceptors/authentication.interceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from "@angular/forms";
import { ProfilePageComponent } from './presentation/pages/profile-page/profile-page.component';
import {DialogModule} from "@angular/cdk/dialog";
import { HeaderLayoutComponent } from './presentation/shared/layouts/header-layout/header-layout.component';
import { HistoryPageComponent } from './presentation/pages/history-page/history-page.component';
import { VideosListComponent } from './presentation/shared/components/videos-list/videos-list.component';

const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true},
];

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    AdminPageComponent,
    ChangePasswordPageComponent,
    SignInPageComponent,
    SignUpPageComponent,
    UnknownPageComponent,
    GenerateVideoPageComponent,
    VideoPlayerComponent,
    DeleteAccountModalComponent,
    DeleteUserModalComponent,
    UsersListComponent,
    ProfilePageComponent,
    HeaderLayoutComponent,
    HistoryPageComponent,
    VideosListComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        DialogModule
    ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
