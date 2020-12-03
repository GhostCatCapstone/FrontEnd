import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryModule } from 'ng-gallery';
import { GALLERY_CONFIG } from 'ng-gallery';
import { ImageDetailsComponent } from './image-details/image-details.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { InternalRegisterPageComponent } from './internal-register-page/internal-register-page.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ImageDetailsComponent,
    SidebarComponent,
    ForgotPasswordComponent,
    SearchPageComponent,
    PasswordResetComponent,
    RegisterPageComponent,
    AccountSettingsComponent,
    InternalRegisterPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatDividerModule,
    NoopAnimationsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    GalleryModule,
  ],
  providers: [
    {
      provide: GALLERY_CONFIG,
      useValue: {
        dots: false,
        imageSize: 'cover'
      }
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [],
})
export class AppModule {}
