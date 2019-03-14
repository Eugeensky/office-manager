import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../services/session/session.service';

@Component({
  selector: 'shared-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private route: ActivatedRoute, private sessionService: SessionService, private router: Router) { }

  ngOnInit() {
    this.sessionService.setSession(this.route.snapshot.queryParams.token);
    this.router.navigateByUrl('');
  }

}
