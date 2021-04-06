import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageThumbnailsPageComponent } from './image-thumbnails-page/image-thumbnails-page.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { GhostCatLoginComponent } from './ghost-cat-login/ghost-cat-login.component';
import { InternalRegisterPageComponent } from './internal-register-page/internal-register-page.component';
import { MapViewPageComponent } from './map-view-page/map-view-page.component';
import { AuthGuardService as AuthGuard } from '../Auth/auth-guard.service';
import { PasswordCodeResetComponent } from './password-code-reset/password-code-reset.component';

const routes: Routes = [
  //{ path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', component: GhostCatLoginComponent },
  { path: 'thumbnails', component: ImageThumbnailsPageComponent, canActivate: [AuthGuard] },
  { path: 'map', component: MapViewPageComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchPageComponent, canActivate: [AuthGuard] },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  //{ path: 'login', component: GhostCatLoginComponent },
  { path: 'login', redirectTo: '', pathMatch: 'full' },
  //{ path: 'settings', component: AccountSettingsComponent, canActivate: [AuthGuard] },
  { path: 'reset', component: PasswordResetComponent },
  { path: 'codeReset', component: PasswordCodeResetComponent },
  //{ path: 'register', component: RegisterPageComponent },
  //{ path: 'internalRegister', component: InternalRegisterPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
