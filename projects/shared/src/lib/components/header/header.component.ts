import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session/session.service';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title;

  public isAuth: boolean;

  constructor(private sessionService: SessionService, private router: Router) { }

  ngOnInit() {

  }

  logOut() {
    this.sessionService.closeSession();
  }
}
