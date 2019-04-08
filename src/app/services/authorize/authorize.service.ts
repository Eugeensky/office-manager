import { Injectable } from '@angular/core';
import { User, AuthResponse } from 'projects/shared/src/public_api';
import { environment } from 'projects/shared/src/enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {

  private _isRegistered: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this.isRegistered = this._isRegistered.asObservable();
    this._isRegistered.next(false);
  }

  public isRegistered: Observable<boolean>;

  public logIn(user: User) {
    this.http.post(`${environment.urls.api}/account/token`, user).subscribe({
      next: (data: AuthResponse) => {
        this._isRegistered.next(true);
        this.redirectToApp(data);
      },
      error: (error) => this._isRegistered.next(false)
    });
  }

  private redirectToApp(response: AuthResponse) {
    window.location.href =
      `${response.isAdmin ? environment.urls.adminPortal : environment.urls.userPortal}/login?login=${response.login}&token=${response.token}`;
  }
}
