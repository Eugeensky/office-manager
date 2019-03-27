import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session/session.service';
import { IdentificationService } from '../../services/identification/identification.service';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title;
  public userLogin: string;
  public isAuth: boolean;
  public menuClassName: string;
  public isMenuOpened = false;

  constructor(private sessionService: SessionService, private router: Router, private identificationService: IdentificationService) {
    this.identificationService.login.subscribe(login => this.userLogin = login);
    this.identificationService.tryIdentify();
  }

  ngOnInit() {
  }

  public logOut() {
    this.sessionService.closeSession();
  }

  public toHome() {
    this.router.navigateByUrl('');
  }

  public toAllUserRequests() {
    this.router.navigateByUrl('allRequests');
  }

  public toggleMenu() {
    this.isMenuOpened = !this.isMenuOpened;
  }
}
