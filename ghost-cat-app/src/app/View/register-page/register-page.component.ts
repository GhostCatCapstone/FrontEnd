import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ServerFacade } from '../../Proxy/ServerFacade';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  constructor(private router:Router, private server: ServerFacade) { }

  ngOnInit(): void {
  }

  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }

  public sendRegisterRequest(event: Event): void {
    var email = (<HTMLInputElement>document.getElementById("EmailUserInput")).value;
    var newPassword = (<HTMLInputElement>document.getElementById("NewPasswordUserInput")).value;
    var retypepassword = (<HTMLInputElement>document.getElementById("RetypePasswordUserInput")).value;
    var firstName = (<HTMLInputElement>document.getElementById("FirstNameUserInput")).value;
    var lastName = (<HTMLInputElement>document.getElementById("LastNameUserInput")).value;
    var phone = (<HTMLInputElement>document.getElementById("PhoneUserInput")).value;
    var company = (<HTMLInputElement>document.getElementById("CompanyUserInput")).value;
    this.server.register(email, newPassword, retypepassword, firstName, lastName, phone, company, this.router);
  }
}
