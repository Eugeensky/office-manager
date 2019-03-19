import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from '../../models/request';

@Injectable({
  providedIn: 'root'
})
export class RequestResolveService implements Resolve<Request> {

  constructor(private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Request | Observable<Request> | Promise<Request> {

    return this.http.get<Request>(`requests/${route.queryParams.requestId}`);
  }
}
