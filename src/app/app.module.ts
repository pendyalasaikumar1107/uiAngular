import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:2000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    }),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAxcHSn5GBlTqs_fgUXiPTbybJWP3pNcm8",
      authDomain: "evaluateprofile.firebaseapp.com",
      projectId: "evaluateprofile",
      storageBucket: "evaluateprofile.appspot.com",
      messagingSenderId: "992086403954",
      appId: "1:992086403954:web:dbd5e85f96851c284e4beb"
    }),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
