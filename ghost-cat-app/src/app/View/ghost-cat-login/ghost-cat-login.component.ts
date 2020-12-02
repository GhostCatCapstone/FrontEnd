import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ServerFacade } from '../../Proxy/ServerFacade';

@Component({
  selector: 'app-ghost-cat-login',
  templateUrl: './ghost-cat-login.component.html',
  styleUrls: ['./ghost-cat-login.component.css']
})
export class GhostCatLoginComponent implements OnInit {

  constructor(private router:Router, private server: ServerFacade) { }

  ngOnInit(): void {
  }

  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }

  public sendLoginRequest(event: Event): void {
    var email = (<HTMLInputElement>document.getElementById("EmailUserInput")).value;
    var password = (<HTMLInputElement>document.getElementById("PasswordUserInput")).value;
    this.server.login(email, password, this.router);
  }
}
