import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FloorInfo } from '../../models/floor-info';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/shared/src/enviroments/enviroments';


@Injectable({
  providedIn: 'root'
})
export class BuildingResolveService implements Resolve<FloorInfo[]> {

  constructor(private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    FloorInfo[] | Observable<FloorInfo[]> | Promise<FloorInfo[]> {

    return this.http.get<FloorInfo[]>(`${environment.urls.api}api/floors`);
  }
}
