import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from "./presentation/pages/landing-page/landing-page.component";
// import {SignInPageComponent} from "./presentation/pages/sign-in-page/sign-in-page.component";
// import {SignUpPageComponent} from "./presentation/pages/sign-up-page/sign-up-page.component";
// import {ChangePasswordPageComponent} from "./presentation/pages/change-password-page/change-password-page.component";
// import {AdminPageComponent} from "./presentation/pages/admin-page/admin-page.component";
import {UnknownPageComponent} from "./presentation/pages/unknown-page/unknown-page.component";
// import {ProfilePageComponent} from "./presentation/pages/profile-page/profile-page.component";
import {HeaderLayoutComponent} from "./presentation/shared/layouts/header-layout/header-layout.component";
import {GenerateVideoPageComponent} from "./presentation/pages/generate-video-page/generate-video-page.component";
import {ProjectsPageComponent} from "./presentation/pages/projects-page/projects-page.component";
// import {HistoryPageComponent} from "./presentation/pages/history-page/history-page.component";

export const signInPageUrl: string = 'sign-in';
// export const signUpPageUrl: string = 'sign-up';
// export const changePasswordPageUrl: string = 'change-password';
// export const adminPageUrl: string = 'admin';
// export const profilePageUrl: string = 'profile';
// export const generateVideoPageUrl: string = 'generate-video';
// export const historyPageUrl: string = 'history';
export const projectsPageUrl: string = 'projects';

const routes: Routes = [
  {
    path: '', component: HeaderLayoutComponent, children: [
      {path: '', title: 'Tinkoff VideoKit', component: LandingPageComponent},
      // {path: signInPageUrl, title: 'Вход', component: SignInPageComponent},
      // {path: signUpPageUrl, title: 'Регистрация', component: SignUpPageComponent},
      // {path: changePasswordPageUrl, title: 'Смена пароля', component: ChangePasswordPageComponent},
      // {path: adminPageUrl, title: 'Пользователи', component: AdminPageComponent},
      // {path: profilePageUrl, title: 'Профиль', component: ProfilePageComponent},
      {path: `${projectsPageUrl}/:id`, title: 'Редактор', component: GenerateVideoPageComponent},
      {path: projectsPageUrl, title: 'Проекты', component: ProjectsPageComponent},
      // {path: historyPageUrl, title: 'История генераций', component: HistoryPageComponent},
      {path: '**', title: 'Страница не найдена', component: UnknownPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
