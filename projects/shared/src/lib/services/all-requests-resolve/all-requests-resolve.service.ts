import { Injectable } from '@angular/core';
import { RequestInfo } from '../../models/request-info';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllRequestsResolve implements Resolve<RequestInfo[]> {

  constructor(private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    RequestInfo[] | Observable<RequestInfo[]> | Promise<RequestInfo[]> {

    return this.http.get<RequestInfo[]>(`requests/allSummary`);
  }

}
