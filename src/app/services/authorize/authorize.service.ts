import { Injectable } from '@angular/core';
import { FakeServer, User, AuthResponse } from 'projects/shared/src/public_api';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {

  constructor() { }

  public logIn(user: User): boolean {
    const userInfo: AuthResponse = FakeServer.getUserInfo(user);
    if ( userInfo && userInfo.validUntil > new Date() ) {
      this.redirectToApp(userInfo);
      return true;
    }
    return false;
  }

  private redirectToApp(userInfo: AuthResponse) {
    switch (userInfo.role) {
      case 'admin': {
// tslint:disable-next-line: max-line-length
        window.location.href = `http://localhost:4201/login?login=${userInfo.login}&token=${userInfo.token}&validUntil=${userInfo.validUntil}`;
        break;
      }
      case 'user': {
// tslint:disable-next-line: max-line-length
        window.location.href = `http://localhost:4202/login?login=${userInfo.login}&token=${userInfo.token}&validUntil=${userInfo.validUntil}`;
        break;
      }
    }
  }
}
