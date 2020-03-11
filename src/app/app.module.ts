import {BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {MainComponent} from './main/main.component';
import {AngularFirestore} from '@angular/fire/firestore';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InformacionComponent } from './informacion/informacion.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PersonalComponent } from './personal/personal.component';
import {AppRoutingModule} from './app-routing.module';
import { LoginComponent } from './login/login.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { IntermedioComponent } from './intermedio/intermedio.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    InformacionComponent,
    PersonalComponent,
    LoginComponent,
    IntermedioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([]),
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})

export class AppModule { }
