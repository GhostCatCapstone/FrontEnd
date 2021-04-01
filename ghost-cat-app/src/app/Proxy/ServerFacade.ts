import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ImageQueryRequest } from '../Model/ImageQueryRequest';
import { ImageQueryResponse } from '../Model/ImageQueryResponse';
import { LoginRequest } from '../Model/LoginRequest';
import { LoginResponse } from '../Model/LoginResponse';
import { RegisterRequest } from '../Model/RegisterRequest';
import { RegisterResponse } from '../Model/RegisterResponse';
import { DeleteBBoxRequest } from '../Model/DeleteBBoxRequest';
import { DeleteBBoxResponse } from '../Model/DeleteBBoxResponse';
import { UpdateBBoxRequest } from '../Model/UpdateBBoxRequest';
import { UpdateBBoxResponse } from '../Model/UpdateBBoxResponse';
import { AddBBoxRequest } from '../Model/AddBBoxRequest';
import { AddBBoxResponse } from '../Model/AddBBoxResponse';
import { AuthorizationService } from "../Auth/authorization.service";

@Injectable({
  providedIn: 'root',
})
export class ServerFacade {
  constructor(private auth: AuthorizationService, private http: HttpClient) { }

  // OLD APIs
  //private imagesUrl: string = 'https://orwi9aw2x4.execute-api.us-east-1.amazonaws.com/DeployAPI/photos';
  //private loginUrl: string = 'https://az5x52mixa.execute-api.us-east-1.amazonaws.com/dev/login';
  //private registerUrl: string = 'https://mhpljllqvj.execute-api.us-east-1.amazonaws.com/dev/register';
  //private deleteBBoxUrl: string = 'https://69ip0r3tvb.execute-api.us-east-1.amazonaws.com/dev/delete-bbox';
  //private updateBBoxUrl: string = 'https://7rh1zwja1d.execute-api.us-east-1.amazonaws.com/dev/update-value';
  //private addBBoxUrl: string = 'https://v7zrn9hnxf.execute-api.us-east-1.amazonaws.com/dev/add-bbox';

  //NEW API
  private apiURL: string = 'https://hdm0cmrqyh.execute-api.us-east-2.amazonaws.com';
  private imagesUrl: string = this.apiURL + '/getImages';
  private deleteBBoxUrl: string = this.apiURL + '/deleteBbox';
  private updateBBoxUrl: string = this.apiURL + '/updateBbox';
  private addBBoxUrl: string = this.apiURL + '/addBbox';
  //declare auth header for use and assignment with each of the api paths
  private requestHeader = null;

  /*public getImagesWithData(
    imageQueryRequest: ImageQueryRequest
  ): Observable<ImageQueryResponse> {
    return this.http.post<ImageQueryResponse>(this.imagesUrl, imageQueryRequest);
  }*/
  public getImagesWithData(
    imageQueryRequest: ImageQueryRequest
  ): Observable<HttpEvent<ImageQueryResponse>> {
    //UPDATE THE VARIABLE NAME ONCE SET UP AUTHORIZER ON PATHS
    const headerOptions = {
      'Authorization': this.auth.getIDToken()
    }
    console.log("ID Token in header\n");
    console.log(headerOptions);
    
    this.requestHeader = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerOptions), 
    };
    console.log("Request header object\n");
    console.log(this.requestHeader);
    //return this.http.post<ImageQueryResponse>(this.imagesUrl, imageQueryRequest);
    //with auth header
    return this.http.post<ImageQueryResponse>(this.imagesUrl, imageQueryRequest, this.requestHeader);
  }

  public async login(
    loginRequest: LoginRequest,
    //email: string, 
    //password: string,
    router: Router
  ): Promise<void> {
    //console.log("About to call sign in function\n");
    this.auth.signIn(loginRequest.userID, loginRequest.password).subscribe((data) => {
      if (data == null) {
        //password needs to be reset
        alert("You must make a new password before logging in");
        //console.log("Password needs to be reset\n");
        router.navigate([`/reset`]);
      }
      else {
        //console.log("Logged in with data: " + data + "\n");
        router.navigate([`/search`]);
      }
    }, (err) => {
      //this.emailVerificationMessage = true;
      //console.log("Error with data: " + err + "\n");
      //console.log(err);
      alert("Error while logging in, please check your username/email and password and try again\n");
    });
  }

  /*Not Currently Letting Users Register Themselves
  public register(
    registerRequest: RegisterRequest
  ): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      this.registerUrl,
      JSON.stringify(registerRequest)
    );
  }*/

  public deleteBoundingBox(deleteBBoxRequest: DeleteBBoxRequest): Observable<HttpEvent<DeleteBBoxResponse>> {

    const headerOptions = {
      'Authorization': this.auth.getIDToken()
    }
    console.log("ID Token in header\n");
    console.log(headerOptions);
    
    this.requestHeader = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerOptions), 
    };
    console.log("Request header object\n");
    console.log(this.requestHeader);

    //return this.http.post<DeleteBBoxResponse>(this.deleteBBoxUrl, deleteBBoxRequest);
    return this.http.post<DeleteBBoxResponse>(this.deleteBBoxUrl, deleteBBoxRequest, this.requestHeader);
  }

  public updateBoundingBox(updateBBoxRequest: UpdateBBoxRequest): Observable<HttpEvent<UpdateBBoxResponse>> {

    const headerOptions = {
      'Authorization': this.auth.getIDToken()
    }
    console.log("ID Token in header\n");
    console.log(headerOptions);
    
    this.requestHeader = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerOptions), 
    };
    console.log("Request header object\n");
    console.log(this.requestHeader);

    //return this.http.post<UpdateBBoxResponse>(this.updateBBoxUrl, updateBBoxRequest);
    return this.http.post<UpdateBBoxResponse>(this.updateBBoxUrl, updateBBoxRequest, this.requestHeader);
  }

  public addBoundingBox(addBBoxRequest: AddBBoxRequest): Observable<HttpEvent<AddBBoxResponse>> {

    const headerOptions = {
      'Authorization': this.auth.getIDToken()
    }
    console.log("ID Token in header\n");
    console.log(headerOptions);
    
    this.requestHeader = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerOptions), 
    };
    console.log("Request header object\n");
    console.log(this.requestHeader);

    //return this.http.post<AddBBoxResponse>(this.addBBoxUrl, addBBoxRequest);
    return this.http.post<AddBBoxResponse>(this.addBBoxUrl, addBBoxRequest, this.requestHeader);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
