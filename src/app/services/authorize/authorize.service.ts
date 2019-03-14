import { Injectable } from '@angular/core';
import { User, AuthResponse } from 'projects/shared/src/public_api';
import { environment } from 'projects/shared/src/enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {

  private _isRegistred: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this.isRegistred = this._isRegistred.asObservable();
    this._isRegistred.next(false);
  }

  public isRegistred: Observable<boolean>;

  public logIn(user: User) {
    this.http.post(`${environment.urls.api}/account/token`, user).subscribe({
      next: (data: AuthResponse) => {
        this._isRegistred.next(true);
        this.redirectToApp(data);
      },
      error: (error) => this._isRegistred.next(false)
    });
  }

  private redirectToApp(response: AuthResponse) {
    window.location.href =
      `${response.isAdmin ? environment.urls.adminPortal : environment.urls.userPortal}/login?&token=${response.token}`;
  }
}
