import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title;
  
  constructor(public authService:AuthService,private router:Router) { }

  ngOnInit() {
  }

  logOut(){
    this.authService.logOut();
    this.router.navigateByUrl('auth');
  }
}
