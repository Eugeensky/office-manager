import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SessionService } from './services/session/session.service';
import { AuthResponse } from './models/auth-response';
import { Session } from './models/session';
import { UserSessionInfo } from './models/user-session-info';
import { User } from './models/user';
import { FakeServer } from './helpers/fake-server/fake-server';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    SpinnerComponent
  ],
  providers:[
    SessionService
  ],
  imports: [
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
