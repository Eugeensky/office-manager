import { Injectable } from '@angular/core';
import { Session } from '../../models/session';


@Injectable()
export class SessionService {

  constructor() { }

  public setSession(params: any) {
    try {
      const session = Session.getFromParams(params);
      if ( new Date(session.validUntil) > new Date() ) {
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
      const session: Session = Session.getFromParams(JSON.parse(localStorage.getItem('session')));
      if ( session.validUntil > new Date() ) {
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
