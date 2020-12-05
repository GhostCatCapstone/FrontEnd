import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Router} from '@angular/router';
import { ImageQueryRequest } from '../Model/ImageQueryRequest';
import { ImageQueryResponse } from '../Model/ImageQueryResponse';
import { LoginRequest } from '../Model/LoginRequest';

@Injectable({
  providedIn: 'root',
})
export class ServerFacade {
  constructor(private http: HttpClient) {}

  private url: string =
    'https://orwi9aw2x4.execute-api.us-east-1.amazonaws.com/DeployAPI/photos';

  public getImagesWithData(
    imageQueryRequest: ImageQueryRequest
  ): Observable<ImageQueryResponse> {
    return this.http.post<ImageQueryResponse>(this.url, imageQueryRequest);
  }

  public async login(
    loginRequest: LoginRequest,
    router:Router
  ): Promise<void> {
    let url =
      'https://az5x52mixa.execute-api.us-east-1.amazonaws.com/dev/login';

    let resp: any;

      this.http
      .post<string>(url, JSON.stringify(loginRequest))
      .pipe(catchError(this.handleError('login')))
      .subscribe({
        next(response) {
          resp = JSON.parse(JSON.stringify(response));
          if(resp.auth_token != null){
          
            //alert('Got success: ' + JSON.stringify(response));
            router.navigate([`/search`]);
          }
          else{
            alert('Error while logging in: ' + JSON.stringify(response));
          }
        },
      });
  }

  public async register(
    userIDInput: string | null,
    newPasswordInput: string | null,
    retypePasswordInput: string | null,
    firstNameInput: string | null,
    lastNameInput: string | null,
    phone: string | null,
    company: string | null,
    router:Router
  ): Promise<void> {
    alert('User id: ' + userIDInput + '\nNew Password: ' + newPasswordInput
    + '\nRetyped Password: ' + retypePasswordInput + '\nFirst Name: ' + firstNameInput
    + '\nLast Name: ' + lastNameInput + '\nPhone: ' + phone
    + '\nCompany: ' + company);
    //this url isn't real, need to replace with actual url once we have an endpoint.
    let url =
      'https://az5x52mixa.execute-api.us-east-1.amazonaws.com/dev/register';
    /*
      this.http
      .post<string>(url, registerRequest)
      .pipe(catchError(this.handleError('register')))
      .subscribe({
        next(response: Response) {
          alert('Got response from server: ' + JSON.stringify(response) + " With response code: " + response.status.toString());
        },
      });*/

      //if the response code is success, call the login page or log them in and go to the search page. Otherwise notify that the register failed
      if(1){
        router.navigate([`login`]);
      }
      else{
        //tell them register failed
      }
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
