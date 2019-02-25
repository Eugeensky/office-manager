import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private _isAuth: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isAuth.subscribe(isAuth => this._isAuth = isAuth);
    authService.tryAuth();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._isAuth) {
      return true;
    }
    this.router.navigateByUrl('auth');
    return false;
  }
}
