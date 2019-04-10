import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConstructorResolveService implements Resolve<number[]> {
  
  constructor(private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    number[] | Observable<number[]> | Promise<number[]> {

    return this.http.get<number[]>(`floors/numbers`);
  }
}
