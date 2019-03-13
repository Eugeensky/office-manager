import { NgModule } from '@angular/core';

import { BuildingComponent } from './components/building/building.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SessionService } from './services/session/session.service';
import { BrowserModule } from '@angular/platform-browser';
import { FloorComponent } from './components/floor/floor.component';
import { NewRequestComponent } from './components/new-request/new-request.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BuildingComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    SpinnerComponent,
    FloorComponent,
    NewRequestComponent
  ],
  providers: [
    SessionService
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    SpinnerComponent,
    BuildingComponent,
    FloorComponent,
    NewRequestComponent
  ]
})
export class SharedModule { }
