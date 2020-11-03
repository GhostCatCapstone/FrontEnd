import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SendrequesttoserverComponent } from './sendrequesttoserver/sendrequesttoserver.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ImageThumbnailsPageComponent } from './image-thumbnails-page/image-thumbnails-page.component';
import { GhostCatLoginComponent } from './ghost-cat-login/ghost-cat-login.component';

@NgModule({
  declarations: [AppComponent, SendrequesttoserverComponent, ImageThumbnailsPageComponent, GhostCatLoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatDividerModule,
    NoopAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
