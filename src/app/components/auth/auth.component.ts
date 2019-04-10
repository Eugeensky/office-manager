import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorizeService } from 'src/app/services/authorize/authorize.service';


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
    if (this.authForm.valid) {
      this.authService.isRegistered.subscribe(isReg => {
        this.errorMessage = isReg ? '' : 'Invalid login or password';
      });
      this.authService.logIn(this.authForm.value);
    } else {
      this.errorMessage = 'Invalid login or password';
    }
  }
}
