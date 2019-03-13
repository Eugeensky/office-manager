import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/shared/src/enviroments/enviroments';
import { Floor } from '../../models/floor';
import { RoomInfo } from '../../models/room-info';

@Injectable({
  providedIn: 'root'
})
export class FloorResolveService implements Resolve<RoomInfo[]> {

  constructor(private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  RoomInfo[] | Observable<RoomInfo[]> | Promise<RoomInfo[]> {

    return this.http.get<RoomInfo[]>(`${environment.urls.api}api/floors/${route.params.floorNumber}`);
  }
}
