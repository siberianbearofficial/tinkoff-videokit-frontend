import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

const BASE_API_URL: string = '/api';
const VIDEOS_URL: string = 'videos';

@Injectable({
  providedIn: 'root'
})
export class GenerateVideoApiService {

  static SESSION_EXPIRED_ERROR: Error = new Error('Сессия устарела, войдите заново');
  static NETWORK_ERROR: Error = new Error('Ошибка, проверьте интернет соединение');
  static UNKNOWN_ERROR: Error = new Error('Неизвестная ошибка');
  static INTERNAL_SERVER_ERROR: Error = new Error('Внутренняя ошибка сервера');

  constructor(private http: HttpClient) {
  }

  public postVideo(generateVideoRequestModel: FormData) {
    const req: Observable<any> = this.http.post(`${BASE_API_URL}/${VIDEOS_URL}`, generateVideoRequestModel)
      .pipe(catchError((error): Observable<never> => {
        switch (error.status) {
          case 0: {
            return throwError(GenerateVideoApiService.NETWORK_ERROR);
          }
          case 401: {
            return throwError(GenerateVideoApiService.SESSION_EXPIRED_ERROR);
          }
          case 500: {
            return throwError(GenerateVideoApiService.INTERNAL_SERVER_ERROR);
          }
          default: {
            return throwError(GenerateVideoApiService.UNKNOWN_ERROR);
          }
        }
      }));
    return req;
  }

  public getVideos() {
    return this.http.get(`${BASE_API_URL}/${VIDEOS_URL}`)
      .pipe(catchError((error): Observable<never> => {
        switch (error.status) {
          case 0: {
            return throwError(GenerateVideoApiService.NETWORK_ERROR);
          }
          case 401: {
            return throwError(GenerateVideoApiService.SESSION_EXPIRED_ERROR);
          }
          case 500: {
            return throwError(GenerateVideoApiService.INTERNAL_SERVER_ERROR);
          }
          default: {
            return throwError(GenerateVideoApiService.UNKNOWN_ERROR);
          }
        }
      }));
  }

  public deleteVideo(uuid: string) {
    return this.http.delete(`${BASE_API_URL}/${VIDEOS_URL}/${uuid}`)
      .pipe(catchError((error): Observable<never> => {
        switch (error.status) {
          case 0: {
            return throwError(GenerateVideoApiService.NETWORK_ERROR);
          }
          case 401: {
            return throwError(GenerateVideoApiService.SESSION_EXPIRED_ERROR);
          }
          case 500: {
            return throwError(GenerateVideoApiService.INTERNAL_SERVER_ERROR);
          }
          default: {
            return throwError(GenerateVideoApiService.UNKNOWN_ERROR);
          }
        }
      }));
  }
}
