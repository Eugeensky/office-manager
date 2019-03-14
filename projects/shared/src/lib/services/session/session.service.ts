import { Injectable } from '@angular/core';
import { environment } from 'projects/shared/src/enviroments/enviroments';


@Injectable()
export class SessionService {

  constructor() { }

  public setSession(token: string) {
    localStorage.setItem('session', token);
  }

  public closeSession() {
    localStorage.removeItem('session');
    window.location.href = environment.urls.login;
  }
}
