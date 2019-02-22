import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { StoredUser } from 'src/app/models/stored-user';
import { RequestService } from '../request/request.service';
import { Subject, Observable } from 'rxjs';
import { initDomAdapter } from '@angular/platform-browser/src/browser';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private requestService:RequestService) {
    this._isAuth = new Subject<boolean>();
    this.tryAuth();    
  }



  private _isAuth: Subject<boolean>;
  public get isAuth(): Observable<boolean> {
    return this._isAuth.asObservable();
  }

  public tryAuth() {
    let storedUser:StoredUser = JSON.parse(localStorage.getItem('user'));
    this._isAuth.next(!!storedUser);
  }

  public logIn(user: User):Observable<boolean> {
    this.logOut();
    let token:string = this.requestService.GetRegisteredUserToken(user);
    if(token){
      let storedUser:StoredUser = new StoredUser();
      storedUser.login = user.login;
      storedUser.token = token;
      localStorage.setItem('user',JSON.stringify(storedUser));
      this._isAuth.next(true);
    }

    return this.isAuth;
  }

  public logOut(){
    localStorage.removeItem('user');
    this._isAuth.next(false);
  }

}

