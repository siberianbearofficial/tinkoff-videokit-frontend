import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {ProjectModel} from "../models/project-model";

const BASE_API_URL: string = '/api';
const PROJECTS_URL: string = 'projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectsApiService {

  static SESSION_EXPIRED_ERROR: Error = new Error('Сессия устарела, войдите заново');
  static NETWORK_ERROR: Error = new Error('Ошибка, проверьте интернет соединение');
  static UNKNOWN_ERROR: Error = new Error('Неизвестная ошибка');
  static INTERNAL_SERVER_ERROR: Error = new Error('Внутренняя ошибка сервера');

  constructor(private http: HttpClient) {
  }

  // public postVideo(generateVideoRequestModel: FormData) {
  //   const req: Observable<any> = this.http.post(`${BASE_API_URL}/${VIDEOS_URL}`, generateVideoRequestModel)
  //     .pipe(catchError((error): Observable<never> => {
  //       switch (error.status) {
  //         case 0: {
  //           return throwError(ProjectsApiService.NETWORK_ERROR);
  //         }
  //         case 401: {
  //           return throwError(ProjectsApiService.SESSION_EXPIRED_ERROR);
  //         }
  //         case 500: {
  //           return throwError(ProjectsApiService.INTERNAL_SERVER_ERROR);
  //         }
  //         default: {
  //           return throwError(ProjectsApiService.UNKNOWN_ERROR);
  //         }
  //       }
  //     }));
  //   return req;
  // }

  public getProjects() {
    return this.http.get(`${BASE_API_URL}/${PROJECTS_URL}`)
      .pipe(catchError((error): Observable<never> => {
        switch (error.status) {
          case 0: {
            return throwError(ProjectsApiService.NETWORK_ERROR);
          }
          case 401: {
            return throwError(ProjectsApiService.SESSION_EXPIRED_ERROR);
          }
          case 500: {
            return throwError(ProjectsApiService.INTERNAL_SERVER_ERROR);
          }
          default: {
            return throwError(ProjectsApiService.UNKNOWN_ERROR);
          }
        }
      }));
  }

  public getProject(id: string) {
    return this.http.get(`${BASE_API_URL}/${PROJECTS_URL}/${id}`)
      .pipe(catchError((error): Observable<never> => {
        switch (error.status) {
          case 0: {
            return throwError(ProjectsApiService.NETWORK_ERROR);
          }
          case 401: {
            return throwError(ProjectsApiService.SESSION_EXPIRED_ERROR);
          }
          case 500: {
            return throwError(ProjectsApiService.INTERNAL_SERVER_ERROR);
          }
          default: {
            return throwError(ProjectsApiService.UNKNOWN_ERROR);
          }
        }
      }));
  }

  public putProject(id: string, projectModel: ProjectModel) {
    return this.http.patch(`${BASE_API_URL}/${PROJECTS_URL}/${id}`, projectModel)
      .pipe(catchError((error): Observable<never> => {
        switch (error.status) {
          case 0: {
            return throwError(ProjectsApiService.NETWORK_ERROR);
          }
          case 401: {
            return throwError(ProjectsApiService.SESSION_EXPIRED_ERROR);
          }
          case 500: {
            return throwError(ProjectsApiService.INTERNAL_SERVER_ERROR);
          }
          default: {
            return throwError(ProjectsApiService.UNKNOWN_ERROR);
          }
        }
      }));
  }

  public deleteProject(id: string, code: string) {
    return this.http.delete(`${BASE_API_URL}/${PROJECTS_URL}/${id}`, {headers: {Authorization: `Bearer ${code}`}})
      .pipe(catchError((error): Observable<never> => {
        switch (error.status) {
          case 0: {
            return throwError(ProjectsApiService.NETWORK_ERROR);
          }
          case 401: {
            return throwError(ProjectsApiService.SESSION_EXPIRED_ERROR);
          }
          case 500: {
            return throwError(ProjectsApiService.INTERNAL_SERVER_ERROR);
          }
          default: {
            return throwError(ProjectsApiService.UNKNOWN_ERROR);
          }
        }
      }));
  }
}
