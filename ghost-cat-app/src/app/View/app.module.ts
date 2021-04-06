import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryModule } from 'ng-gallery';
import { ImageDetailsComponent } from './image-details/image-details.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { InternalRegisterPageComponent } from './internal-register-page/internal-register-page.component';
import { ImageThumbnailsPageComponent } from './image-thumbnails-page/image-thumbnails-page.component';
import { MapViewPageComponent } from './map-view-page/map-view-page.component';
import { GhostCatLoginComponent } from './ghost-cat-login/ghost-cat-login.component';
import { ExpandableListModule } from 'angular-expandable-list';
import { GoogleMapsWrapperComponent } from './google-maps-wrapper/google-maps-wrapper.component';
import { AuthorizationService } from "../Auth/authorization.service";
import { AuthGuardService as AuthGuard } from "../Auth/auth-guard.service";
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { PasswordCodeResetComponent } from './password-code-reset/password-code-reset.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageThumbnailsPageComponent,
    GhostCatLoginComponent,
    ImageDetailsComponent,
    SidebarComponent,
    ForgotPasswordComponent,
    SearchPageComponent,
    PasswordResetComponent,
    RegisterPageComponent,
    AccountSettingsComponent,
    InternalRegisterPageComponent,
    MapViewPageComponent,
    GoogleMapsWrapperComponent,
    PasswordCodeResetComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    GalleryModule,
    ExpandableListModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAZBl8XPkkHaHpd7_-lAGi9DqslF3S8l7s',
    }),
  ],
  providers: [AuthorizationService, AuthGuard, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService],
  bootstrap: [AppComponent],
  entryComponents: [],
})
export class AppModule { }
