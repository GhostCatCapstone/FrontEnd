import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ServerFacade {
  constructor(private http: HttpClient) {}

  public async getImages(
    startDate: string | null,
    endDate: string | null,
    animal: string | null,
    camera: string | null
  ): Promise<void> {
    let url =
      'https://orwi9aw2x4.execute-api.us-east-1.amazonaws.com/InitialStage/photos';

    let parameterNames: string[] = [];
    let parameterValues: string[] = [];

    startDate &&
      parameterNames.push('StartDate') &&
      parameterValues.push(startDate);
    endDate && parameterNames.push('EndDate') && parameterValues.push(endDate);
    animal && parameterNames.push('Animal') && parameterValues.push(animal);
    camera && parameterNames.push('Camera') && parameterValues.push(camera);

    url = this.addQueryString(url, parameterNames, parameterValues);

    this.http
      .get<string>(url)
      .pipe(catchError(this.handleError('getImages')))
      .subscribe({
        next(response) {
          alert('Got response from server: ' + JSON.stringify(response));
        },
      });
  }

  private addQueryString(
    url: string,
    parameterNames: string[],
    parameterValues: string[]
  ): string {
    url = url + '?';

    parameterNames.forEach((parameterName: string, index: number) => {
      if (index > 0) {
        url += '&';
      }
      url += parameterName + '=' + parameterValues[index];
    });

    return url;
  }

  public async login(
    userIDInput: string | null,
    passwordHashInput: string | null,
    router:Router
  ): Promise<void> {
    let url =
      'https://az5x52mixa.execute-api.us-east-1.amazonaws.com/dev/login';

    let loginRequest: JSON;
    let resp: any;

    //working test user
    /*obj: any = 
    {
      "userID": "researcherID",
      "passwordHash":"r4greog5httr"
    };*/


    let obj: any = 
    {
      "userID": userIDInput,
      "passwordHash":passwordHashInput
    };

    loginRequest = <JSON>obj;

      this.http
      .post<string>(url, loginRequest)
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
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
