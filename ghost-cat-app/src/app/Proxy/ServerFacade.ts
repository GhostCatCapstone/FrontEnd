import { HttpClient } from '@angular/common/http';
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
    router: Router
  ): Promise<void> {
    let url =
      'https://az5x52mixa.execute-api.us-east-1.amazonaws.com/dev/login';

    this.http
      .post<LoginResponse>(url, JSON.stringify(loginRequest))
      .pipe(catchError(this.handleError('login')))
      .subscribe({
        next(response: LoginResponse) {
          if (response.auth_token != null) {
            router.navigate([`/search`]);
          } else {
            alert('Error while logging in: ' + response.error_message);
          }
        },
      });
  }

  public register(
    registerRequest: RegisterRequest
  ): Observable<RegisterResponse> {
    let url =
      'https://mhpljllqvj.execute-api.us-east-1.amazonaws.com/dev/register';

    return this.http.post<RegisterResponse>(
      url,
      JSON.stringify(registerRequest)
    );
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
