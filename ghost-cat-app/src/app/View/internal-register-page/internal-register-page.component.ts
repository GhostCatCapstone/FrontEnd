import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import * as crypto from 'crypto-js';
import { RegisterRequest } from 'src/app/Model/RegisterRequest';
import { RegisterResponse } from 'src/app/Model/RegisterResponse';
import { ServerFacade } from '../../Proxy/ServerFacade';

@Component({
  selector: 'app-internal-register-page',
  templateUrl: './internal-register-page.component.html',
  styleUrls: ['./internal-register-page.component.css'],
})
export class InternalRegisterPageComponent implements OnInit {
  public email: string = '';
  public password: string = '';
  public confirmPassword: string = '';
  public registerComplete: boolean = false;

  constructor(private router: Router, private server: ServerFacade) {}

  ngOnInit(): void {}

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  public sendRegisterRequest(): void {
    if (this.registerComplete) {
      return;
    }

    if (this.password != this.confirmPassword) {
      alert('Passwords do not match.\nPlease try again');
      return;
    }

    const passwordHash = crypto.SHA512(this.password).toString();
    const request = new RegisterRequest(this.email, passwordHash);
    //Registering is no longer done this way, it's done through cognito
    /*this.server
      .register(request)
      .pipe(catchError(this.server.handleError('register')))
      .subscribe((response: RegisterResponse) => {
        this.registerComplete = response.success;
        if (!response.success) {
          alert('Error while registering: ' + response.errorMsg);
        }
      });*/
  }
}
