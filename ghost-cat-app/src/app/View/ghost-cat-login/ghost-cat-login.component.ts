import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerFacade } from '../../Proxy/ServerFacade';
import { LoginRequest } from '../../Model/LoginRequest';

@Component({
  selector: 'app-ghost-cat-login',
  templateUrl: './ghost-cat-login.component.html',
  styleUrls: ['./ghost-cat-login.component.css'],
})
export class GhostCatLoginComponent implements OnInit {
  public email: string = '';
  public password: string = '';

  constructor(private router: Router, private server: ServerFacade) { }

  ngOnInit(): void { console.log("On log in\n"); }

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  public sendLoginRequest(): void {
    //Password hash no longer needed because cognito hashes with the way the password is sent
    //const passwordHash = crypto.SHA512(this.password).toString(); 
    const loginRequest: LoginRequest = new LoginRequest(
      this.email,
      this.password
    );
    this.server.login(loginRequest, this.router);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      this.sendLoginRequest();
    }
  }
}
