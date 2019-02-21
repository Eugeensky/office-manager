import { Injectable } from '@angular/core';
import { User, AuthUser, StoredUser } from 'src/app/models/user/user';
import { RequestService } from '../request/request.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private requestService:RequestService) {
    
    let storedUser:StoredUser = JSON.parse(localStorage.getItem('user'));
    
    if(storedUser){
      
      this.isAuth = true;
    }
    else {
      console.log(123);
      this.isAuth = false;
    }
  }

  public isAuth:boolean;

  public logIn(user:User){
    this.logOut();
    let token:string = this.requestService.GetRegisteredUserToken(user);
    if(token){
      let storedUser:StoredUser = new StoredUser();
      storedUser.login = user.login;
      storedUser.token = token;
      localStorage.setItem('user',JSON.stringify(storedUser));
      this.isAuth = true;
    }
  }

  public logOut(){
    localStorage.removeItem('user');
    this.isAuth = false;
  }
}
