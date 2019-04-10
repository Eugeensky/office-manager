import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from 'projects/shared/src/public_api';
import { AuthInterceptor } from 'projects/shared/src/lib/interceptors/auth-interceptor.service';
import { RequestComponent } from './components/request/request.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllRequestsComponent } from './components/all-requests/all-requests.component';
import { FloorComponent } from './components/floor/floor.component';
import { RoomComponent } from './components/room/room.component';
import { OfficeConstructorComponent } from './components/office-constructor/office-constructor.component';
import { NewFloorComponent } from './components/office-constructor/new-floor/new-floor.component';
import { EditFloorComponent } from './components/office-constructor/edit-floor/edit-floor.component';

@NgModule({
  declarations: [
    AppComponent,
    RequestComponent,
    AllRequestsComponent,
    FloorComponent,
    RoomComponent,
    OfficeConstructorComponent,
    NewFloorComponent,
    EditFloorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
