import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'projects/shared/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public title = 'user portal';

  constructor(private sessionService: SessionService, private router: Router) { }

  public logOut() {
    this.sessionService.closeSession();
  }

  public toAllUserRequests() {
    this.router.navigateByUrl('allRequests');
  }
}
