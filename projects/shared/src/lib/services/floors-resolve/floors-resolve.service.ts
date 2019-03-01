import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FloorInfo } from '../../models/floor-info';
import { Observable } from 'rxjs';
import { Session } from '../../models/session';
import { FakeServer } from '../../helpers/fake-server/fake-server';


@Injectable({
  providedIn: 'root'
})
export class FloorsResolveService implements Resolve<FloorInfo[]> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  FloorInfo[] | Observable<FloorInfo[]> | Promise<FloorInfo[]> {
    try {
      const session: Session = Session.getFromParams(JSON.parse(localStorage.getItem('session')));
      if (session.isValid()) {
        return FakeServer.getFloorsInfo(session);
      }
      return null;
    } catch {
      return null;
    }
  }

  constructor() { }
}
