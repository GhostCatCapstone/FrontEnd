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

@NgModule({
  declarations: [AppComponent, SendrequesttoserverComponent, ModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatDividerModule,
    NoopAnimationsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent],
})
export class AppModule { }
