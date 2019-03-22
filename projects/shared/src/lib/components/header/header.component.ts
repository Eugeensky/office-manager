import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session/session.service';
import { IdentificationService } from '../../services/identification/identification.service';

const hiddenMenuClassName = 'user-info__menu';
const visibleMenuClassName = 'user-info__menu user-info__menu_visible';

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

  constructor(private sessionService: SessionService, private router: Router, private identificationService: IdentificationService) {
    this.identificationService.login.subscribe(login => this.userLogin = login);
    this.identificationService.tryIdentify();
    this.menuClassName = hiddenMenuClassName;
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
    console.log(1);
  }

  public toggleMenu() {
    if (this.menuClassName === hiddenMenuClassName) {
      this.menuClassName = visibleMenuClassName;
    } else {
      this.menuClassName = hiddenMenuClassName;
    }
  }
}
