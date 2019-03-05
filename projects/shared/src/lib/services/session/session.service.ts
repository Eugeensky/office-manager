import { Injectable } from '@angular/core';
import { Session } from '../../models/session';


@Injectable()
export class SessionService {

  constructor() { }

  public setSession(params: any) {
    try {
      const session = this.getSessionFromParams(params);
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
      const session = this.getSessionFromParams(JSON.parse(localStorage.getItem('session')));
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


  public getSessionFromParams(params: any): Session {
    if (params.login && params.token && params.validUntil) {
      const session: Session = new Session();
      session.login = params.login;
      session.token = params.token;
      session.validUntil = params.validUntil;
      return session;
    } else {
      throw new Error('Invalid params');
    }
  }

  private redirectToLogin() {
    window.location.href = 'http://localhost:4200/';
  }
}
