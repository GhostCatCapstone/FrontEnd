import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
