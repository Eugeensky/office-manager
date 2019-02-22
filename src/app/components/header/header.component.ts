import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title;
  
  public isAuth:boolean;

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
    this.authService.isAuth.subscribe(isAuth => {
      this.isAuth = isAuth;      
    });
    this.authService.tryAuth();
  }

  logOut(){
    this.authService.logOut();
    this.router.navigateByUrl('auth');
  }
}
