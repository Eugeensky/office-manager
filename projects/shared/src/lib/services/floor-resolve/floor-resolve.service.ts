import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RoomInfo } from '../../models/room-info';

@Injectable({
  providedIn: 'root'
})
export class FloorResolveService implements Resolve<RoomInfo[]> {

  constructor(private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    RoomInfo[] | Observable<RoomInfo[]> | Promise<RoomInfo[]> {

    return this.http.get<RoomInfo[]>(`floors/${route.params.floorNumber}`);
  }
}
