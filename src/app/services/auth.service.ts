import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { catchError, switchMap} from 'rxjs/operators';
import { throwError, of, Observable} from 'rxjs';
import {baseUrl,UrlNames} from './url-provider';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
 })
export class AuthService {
  
  
  private headers = new HttpHeaders({
    'content-type':'application/json'
  }) ;
  constructor( private _http:HttpClient, private errorHandler: ErrorHandlerService) { }
 
  login(body){
    return this._http.post(baseUrl+UrlNames.Login,body).pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError((error: any, caught: Observable<any>) => {
        return this.errorHandler.processError(error);
      })
    );
  }
 
  deleteUser(id:number) {
    let body: any;
    body = {};
    return this._http.post(baseUrl+UrlNames.DeleteUser+id,body).pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError((error: any, caught: Observable<any>) => {
        return this.errorHandler.processError(error);
      })
    );
  }
  registration(body:any){
    return this._http.post(baseUrl+UrlNames.Registration, body).pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError((error: any, caught: Observable<any>) => {
        return this.errorHandler.processError(error);
      })
    );
  }
 updatecurrentUser(body:any){
  return this._http.post(baseUrl+UrlNames.UpdateUser, body).pipe(
    switchMap((res: any) => {
      return of(res);
    }),
    catchError((error: any, caught: Observable<any>) => {
      return this.errorHandler.processError(error);
    })
  );
}
  getUsers(){
    return this._http.get(baseUrl+UrlNames.GetUsers).pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError((error: any, caught: Observable<any>) => {
        return this.errorHandler.processError(error);
      })
    );
  }
}