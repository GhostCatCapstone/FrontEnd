import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SendrequesttoserverComponent } from './sendrequesttoserver/sendrequesttoserver.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './modal/modal.component';
import { ImageThumbnailsPageComponent } from './image-thumbnails-page/image-thumbnails-page.component';
import { GhostCatLoginComponent } from './ghost-cat-login/ghost-cat-login.component';
import { GalleryModule } from 'ng-gallery';
import { GALLERY_CONFIG } from 'ng-gallery';
import { ImageDetailsComponent } from './image-details/image-details.component';

@NgModule({
  declarations: [AppComponent, SendrequesttoserverComponent, ImageThumbnailsPageComponent, GhostCatLoginComponent, ModalComponent, ImageDetailsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatDividerModule,
    NoopAnimationsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    GalleryModule
  ],
  providers: [
    {
      provide: GALLERY_CONFIG,
      useValue: {
        dots: true,
        imageSize: 'cover'
      }
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent],
})
export class AppModule { }
