import { Injectable } from '@angular/core';
import { Session } from '../../models/session';


@Injectable()
export class SessionService {

  constructor() { }

  public setSession(params: any) {
    try {
      const session = new Session(params);
      if ( session.isValid ) {
        localStorage.setItem('session', JSON.stringify(session));
      } else {
        this.redirectToLogin();
      }

    } catch {
      this.redirectToLogin();
    }
  }

  public closeSession() {
    localStorage.removeItem('session');
    this.redirectToLogin();
  }

  public isSessionValid(): boolean {
    try {
      const session = new Session(JSON.parse(localStorage.getItem('session')));
      if ( session.isValid ) {
        return true;
      }
      this.redirectToLogin();
      return false;
    } catch {
      this.redirectToLogin();
      return false;
    }
  }

  private redirectToLogin() {
    window.location.href = 'http://localhost:4200/';
  }
}
