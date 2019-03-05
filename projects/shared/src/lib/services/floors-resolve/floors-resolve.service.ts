import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FloorInfo } from '../../models/floor-info';
import { Observable } from 'rxjs';
import { Session } from '../../models/session';
import { FakeServer } from '../../helpers/fake-server/fake-server';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SessionService } from '../session/session.service';


@Injectable({
  providedIn: 'root'
})
export class FloorsResolveService implements Resolve<FloorInfo[]> {

  constructor(private sessionService: SessionService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    FloorInfo[] | Observable<FloorInfo[]> | Promise<FloorInfo[]> {
    try {
      const session: Session = this.sessionService.getSessionFromParams(JSON.parse(localStorage.getItem('session')));
      if (session.isValid) {
        return FakeServer.getFloorsInfo(session);
      }
    } catch {
      return null;
    }
  }
}
