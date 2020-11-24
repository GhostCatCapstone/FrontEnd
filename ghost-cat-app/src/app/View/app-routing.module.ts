import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImageThumbnailsPageComponent} from './image-thumbnails-page/image-thumbnails-page.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {SearchPageComponent} from './search-page/search-page.component';
import {GhostCatLoginComponent} from './ghost-cat-login/ghost-cat-login.component';


const routes: Routes = [
  {path:'thumbnails', component: ImageThumbnailsPageComponent},
  {path:'search', component: SearchPageComponent},
  {path:'forgotpassword', component: ForgotPasswordComponent},
  {path:'login', component: GhostCatLoginComponent},
  {path:'settings', component: AccountSettingsComponent},
  {path:'reset', component: PasswordResetComponent},
  {path:'register', component: RegisterPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ImageThumbnailsPageComponent, GhostCatLoginComponent]
