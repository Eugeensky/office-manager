import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { StoredUser } from 'src/app/models/stored-user';
import { RequestService } from '../request/request.service';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuth: Subject<boolean> = new Subject<boolean>();
  constructor(private requestService: RequestService) {
    this.tryAuth();
  }

  public get isAuth(): Observable<boolean> {
    return this._isAuth.asObservable();
  }

  public tryAuth() {
    try {
      const storedUser: StoredUser = JSON.parse(localStorage.getItem('user'));
      this._isAuth.next(!!storedUser);
    } catch {
      this._isAuth.next(false);
    }
  }

  public logIn(user: User): Observable<boolean> {
    this.logOut();
    const token: string = this.requestService.GetRegisteredUserToken(user);
    if (token) {
      const storedUser: StoredUser = new StoredUser();
      storedUser.login = user.login;
      storedUser.token = token;
      localStorage.setItem('user', JSON.stringify(storedUser));
      this._isAuth.next(true);
    }

    return this.isAuth;
  }

  public logOut() {
    localStorage.removeItem('user');
    this._isAuth.next(false);
  }

}
