import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdentificationService {
  private _login: Subject<string> = new Subject<string>();
  public login: Observable<string>;
  constructor() {
    this.login = this._login.asObservable();
    this.tryIdentify();
  }
  public setLogin(login: string) {
    if (login !== null) {
      localStorage.setItem('login', login);
      this.tryIdentify();
    }
  }
  public tryIdentify() {
    this._login.next(localStorage.getItem('login') || 'Unknown');
  }
}
