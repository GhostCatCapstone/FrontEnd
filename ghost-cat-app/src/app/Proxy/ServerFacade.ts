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
import { DeleteBBoxRequest } from '../Model/DeleteBBoxRequest';
import { DeleteBBoxResponse } from '../Model/DeleteBBoxResponse';
import { UpdateBBoxRequest } from '../Model/UpdateBBoxRequest';
import { UpdateBBoxResponse } from '../Model/UpdateBBoxResponse';
import { AddBBoxRequest } from '../Model/AddBBoxRequest';
import { AddBBoxResponse } from '../Model/AddBBoxResponse';

@Injectable({
  providedIn: 'root',
})
export class ServerFacade {
  constructor(private http: HttpClient) { }

  // TODO: combine api gateways into one url
  private imagesUrl: string = 'https://orwi9aw2x4.execute-api.us-east-1.amazonaws.com/DeployAPI/photos';
  private loginUrl: string = 'https://az5x52mixa.execute-api.us-east-1.amazonaws.com/dev/login';
  private registerUrl: string = 'https://mhpljllqvj.execute-api.us-east-1.amazonaws.com/dev/register';
  private deleteBBoxUrl: string = 'https://69ip0r3tvb.execute-api.us-east-1.amazonaws.com/dev/delete-bbox';
  private updateBBoxUrl: string = 'https://7rh1zwja1d.execute-api.us-east-1.amazonaws.com/dev/update-value';
  private addBBoxUrl: string = 'https://v7zrn9hnxf.execute-api.us-east-1.amazonaws.com/dev/add-bbox';

  public getImagesWithData(
    imageQueryRequest: ImageQueryRequest
  ): Observable<ImageQueryResponse> {
    return this.http.post<ImageQueryResponse>(this.imagesUrl, imageQueryRequest);
  }

  public async login(
    loginRequest: LoginRequest,
    router: Router
  ): Promise<void> {
    this.http
      .post<LoginResponse>(this.loginUrl, JSON.stringify(loginRequest))
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
    return this.http.post<RegisterResponse>(
      this.registerUrl,
      JSON.stringify(registerRequest)
    );
  }

  public deleteBoundingBox(deleteBBoxRequest: DeleteBBoxRequest): Observable<DeleteBBoxResponse> {
    return this.http.post<DeleteBBoxResponse>(this.deleteBBoxUrl, deleteBBoxRequest);
  }

  public updateBoundingBox(updateBBoxRequest: UpdateBBoxRequest): Observable<UpdateBBoxResponse> {
    return this.http.post<UpdateBBoxResponse>(this.updateBBoxUrl, updateBBoxRequest);
  }

  public addBoundingBox(addBBoxRequest: AddBBoxRequest): Observable<AddBBoxResponse> {
    return this.http.post<AddBBoxResponse>(this.addBBoxUrl, addBBoxRequest);
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
