import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { FakeServer } from 'src/app/helpers/fake-server/fake-server';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor() { }
  public GetRegisteredUserToken(user:User):string{
    return FakeServer.GetRegisteredUserToken(user);
  }
}
