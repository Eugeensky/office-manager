import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public authForm: FormGroup;
  public errorMessage:string;

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.authForm = new FormGroup({
      login: new FormControl('',Validators.required),
      password : new FormControl('',Validators.required)
    });
  }

  

  public logIn(){
    
    let user: User = this.authForm.value;
    this.authService.logIn(user);
    if(!this.authService.isAuth){
      this.errorMessage = "INVALID LOGIN OR PASS";
    }
    this.router.navigateByUrl('');
  }
}
