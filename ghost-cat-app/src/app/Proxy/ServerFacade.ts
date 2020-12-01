import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ImageQueryRequest } from '../Model/ImageQueryRequest';
import { ImageQueryResponse } from '../Model/ImageQueryResponse';

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
