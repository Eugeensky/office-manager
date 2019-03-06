import { NgModule } from '@angular/core';

import { BuildingComponent } from './components/building/building.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SessionService } from './services/session/session.service';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    BuildingComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    SpinnerComponent
  ],
  providers: [
    SessionService
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    SpinnerComponent,
    BuildingComponent
  ]
})
export class SharedModule { }
