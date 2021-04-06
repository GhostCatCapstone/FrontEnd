import { Component, HostListener, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthorizationService } from "../../Auth/authorization.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public email: string = '';
  constructor(private router:Router, private auth: AuthorizationService) { }

  ngOnInit(): void {
  }

  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }

  public sendPasswordReset():void{
    //console.log("Calling function to send password reset\n");

    this.auth.forgotPasswordReset(this.email).subscribe((data) => {
        this.router.navigate([`/codeReset`]);
    }, (err) => {
      //console.log("Error while resetting password with data: " + err + "\n");
      alert("Error while resetting password\n");
    });
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      this.sendPasswordReset();
    }
  }

}
