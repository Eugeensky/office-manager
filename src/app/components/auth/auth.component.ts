import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorizeService } from 'src/app/services/authorize/authorize.service';
import { User } from 'projects/shared/src/public_api';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public authForm: FormGroup;
  public errorMessage: string;

  constructor(private authService: AuthorizeService) { }

  ngOnInit() {
    this.authForm = new FormGroup({
      login: new FormControl('', Validators.required),
      password : new FormControl('', Validators.required)
    });
  }

  public logIn() {
    const user: User = this.authForm.value;
    if (!this.authService.logIn(user)) {
      this.errorMessage = 'INVALID LOGIN OR PASS';
    }
  }
}
