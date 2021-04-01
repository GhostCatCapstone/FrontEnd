import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';
import { LoginRequest } from '../Model/LoginRequest';
import { LoginResponse } from '../Model/LoginResponse';
import { JwtHelperService } from '@auth0/angular-jwt';

const poolData = {
  UserPoolId: 'us-east-2_qBPLQCISY', // Your user pool id here
  ClientId: '11pjdv8gjg7mh95sku7t33uvg1' // Your client id here  
};

var sessionUserAttributes, cognitoUser, currentUserName;

const userPool = new CognitoUserPool(poolData);

@Injectable()
export class AuthorizationService {
  constructor(public jwtHelper: JwtHelperService) { }

  signIn(email, password) {

    const authenticationData = {
      Username: email,
      Password: password,
    };
    //console.log("Made authenticationData object\n");
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    //console.log("Made authenticationDetails object\n");
    const userData = {
      Username: email,
      Pool: userPool
    };
    //console.log("Made userData object\n");
    cognitoUser = new CognitoUser(userData);
    //console.log("Made CognitoUser object\n");

    return Observable.create(observer => {
      //console.log("Calling  authenticateUser\n");
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          //set global username to be used if needed
          currentUserName = email;
          //console.log("Log in success is" + result + "\n");
          var accessToken = result.getAccessToken().getJwtToken();
          var idToken = result.getIdToken().getJwtToken();
          //console.log("Login Result is: " + result.toString() + "\n");
          //console.log(result);
          //console.log("Just got jwt token\n");
          localStorage.setItem('accessToken', JSON.stringify({ token: accessToken }));
          localStorage.setItem('idToken', JSON.stringify({ token: idToken }));
          console.log("Just stored jwt token in local storage\n");
          console.log("Access Token:\n");
          console.log(JSON.stringify({ token: accessToken }));
          console.log("ID Token:\n");
          console.log(JSON.stringify({ token: idToken }));
          observer.next(result);
          observer.complete();
        },
        onFailure: function (err) {
          //console.log("Log in failure is" + err + "\n");
          //console.log(err);
          observer.error(err);
        },
        newPasswordRequired: function (userAttributes, requiredAttributes) {
          // User was signed up by an admin and must provide new
          // password and required attributes, if any, to complete
          // authentication.

          // the api doesn't accept this field back
          delete userAttributes.email_verified;

          // store userAttributes on global variable
          //console.log("Cognito user with attributes " + cognitoUser + "\n");
          //console.log(cognitoUser);
          sessionUserAttributes = userAttributes;
          //console.log("User with attributes " + sessionUserAttributes + "needs new password\n");
          //console.log(sessionUserAttributes);
          requiredAttributes = null;
          //console.log("Required attributes: " + requiredAttributes + "\n");
          //console.log(requiredAttributes);
          observer.next(requiredAttributes);
        }
      });
    });
  }

  // ... handle new password flow on your app
  handleNewPassword(newPassword) {
    return Observable.create(observer => {
      //console.log("Calling  authenticateUser\n");
      cognitoUser.completeNewPasswordChallenge(newPassword, sessionUserAttributes, {
        onSuccess: function (result) {

          //console.log("Reset password success is" + result + "\n");
          observer.next(result);
          observer.complete();
        },
        onFailure: function (err) {
          //console.log("Reset password failure is" + err + "\n");
          //console.log(err);
          observer.error(err);
        }
      });
    });
  }

  isLoggedIn() {
    //return userPool.getCurrentUser() != null;
    const token = localStorage.getItem('accessToken');
    //console.log("got token from local storage");
    //console.log(token);
    var searchForNull = "null";
    if (!(token.indexOf(searchForNull) !== -1)) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    else {
      return false;
    }
  }

  getIDToken() {
    //get idToken for accessing APIs
    var tempTokenObj = JSON.parse(localStorage.getItem('idToken'));
    console.log("Stripped token is\n");
    console.log(tempTokenObj.token);
    return tempTokenObj.token;
  }

  getAuthenticatedUser() {
    // gets the current user from the local storage
    return userPool.getCurrentUser();
  }

  getUserName() {
    // gets the current username of logged in user
    return currentUserName;
  }

  logout() {
    this.getAuthenticatedUser().signOut();
    cognitoUser = null;
    localStorage.setItem('accesToken', JSON.stringify({ token: null }));
    localStorage.setItem('idToken', JSON.stringify({ token: null }));
  }

  forgotPasswordReset(email) {

    // setup cognitoUser first
    cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool
    });

    return Observable.create(observer => {
      //console.log("Calling  authenticateUser\n");
      cognitoUser.forgotPassword({
        onSuccess: function (data) {
          // successfully initiated reset password request
          //console.log('Success:CodeDeliveryData from forgotPassword: ' + data + "\n");
          observer.next(data);
          observer.complete();
        },
        onFailure: function (err) {
          //alert(err.message || JSON.stringify(err));
          //console.log("Error: " + err.message + JSON.stringify(err) + "\n");
          observer.error(err);
        },
        //Optional automatic callback
        inputVerificationCode: function (data) {
          //console.log('VerificationCode:Code sent to: ' + data + "\n");
          data = null;
          observer.next(data);
        },
      });
    });
  }

  confirmNewPasswordWithCode(newPassword, verificationCode) {
    //since cognito user is global, we're able to get their username from the previous time they input it with the forgotpassword page
    return Observable.create(observer => {
      cognitoUser.confirmPassword(verificationCode, newPassword, {
        onFailure(err) {
          //console.log("Error: " + err.message + JSON.stringify(err) + "\n");
          observer.error(err);
        },
        onSuccess: function (data) {
          observer.next(data);
          observer.complete();
        },
      });
    });
  }
}