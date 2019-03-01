import { Injectable } from '@angular/core';
import { Session } from '../../models/session';


@Injectable()
export class SessionService {

  constructor() { }

  public setSession(params: any) {
    if (params.login && params.token && params.validUntil) {
      const session: Session = new Session();
      session.login = params.login;
      session.token = params.token;
      session.validUntil = new Date(params.validUntil);
      if ( session && new Date(session.validUntil) > new Date() ) {
        localStorage.setItem('session', JSON.stringify(session));
      } else {
        this.redirectToLogin();
      }
    } else {
      this.redirectToLogin();
    }
  }

  public closeSession() {
    localStorage.removeItem('session');
    this.redirectToLogin();
  }

  public isSessionValid(): boolean {
    try {
      const session: Session = JSON.parse(localStorage.getItem('session'));
      if ( session && session.validUntil > new Date() ) {
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
