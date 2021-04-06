import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from "../../Auth/authorization.service";

@Component({
  selector: 'app-password-code-reset',
  templateUrl: './password-code-reset.component.html',
  styleUrls: ['./password-code-reset.component.css']
})
export class PasswordCodeResetComponent implements OnInit {
  public verificationCode: string = '';
  public newPassword: string = '';
  public newPasswordConfirm: string = '';

  constructor(private auth: AuthorizationService, private router: Router) { }

  ngOnInit(): void {
  }

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  public confirmPasswordReset(): void {
    //console.log("Called reset password button\n");
    if (this.newPassword === this.newPasswordConfirm) {
      //console.log("New passwords match: " + this.newPassword + "& " + this.newPasswordConfirm + "\n");
      if (this.newPassword.length >= 8) {
        //console.log("New password is long enough\n");
        //console.log("Resetting password\n");

        this.auth.confirmNewPasswordWithCode(this.newPassword, this.verificationCode).subscribe((data) => {
          //console.log("Reset password with data: " + data + "\n");
          alert("Password has been reset, please login with your new password");
          this.router.navigate([`/login`]);
        }, (err) => {
          //console.log("Error while resetting password with data: " + err + "\n");
          alert("Error while resetting password\n");
        });
      }
      else {
        alert("New password cannot be less than 8 characters\n");
      }
    }
    else {
      //console.log("New passwords don't match: " + this.newPassword + "& " + this.newPasswordConfirm + "\n");
      alert("Passwords don't match\n");
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      this.confirmPasswordReset();
    }
  }

}
