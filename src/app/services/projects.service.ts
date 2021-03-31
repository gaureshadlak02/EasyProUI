import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpResponse, HttpErrorResponse, HttpEvent, HttpRequest} from '@angular/common/http';
import { catchError, switchMap} from 'rxjs/operators';
import { throwError, of, Observable} from 'rxjs';
import {baseUrl,UrlNames} from './url-provider';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  billingScheduleByProejct(projectid: any) {
    return this._http.get(baseUrl+UrlNames.getBillingScheduleByProject+"?projectid="+projectid).pipe(
      switchMap((res:any)=>{
        return of (res)
      }),
      catchError((error: any, caught: Observable<any>) => {
       return this.errorHandler.processError(error);
      })
    );
  }
  billingScheduleByBillingCode(projectid: any,Billschedulecode : any) {
    return this._http.get(baseUrl+UrlNames.getBillingScheduleByBillingCode+"?projectid="+projectid + "&Billschedulecode="+ Billschedulecode).pipe(
      switchMap((res:any)=>{
        return of (res)
      }),
      catchError((error: any, caught: Observable<any>) => {
       return this.errorHandler.processError(error);
      })
    );
  }

  billingCustomer(projectID:any) {
    return this._http.get(baseUrl+UrlNames.getBillingCustomer+"?projectid="+projectID).pipe(
      switchMap((res:any)=>{
        return of (res)
      }),
      catchError((error: any, caught: Observable<any>) => {
       return this.errorHandler.processError(error);
      })
    );
  }
  billingSchedule() {
    return this._http.get(baseUrl+UrlNames.getBillingSchedule).pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError((error: any, caught: Observable<any>) => {
        return this.errorHandler.processError(error);
      })
    );
  }

  projectMaster()
  {
    return this._http.get(baseUrl+UrlNames.getProject).pipe(
      switchMap((res:any)=>{
        return of(res);
      }),
      catchError((error:any, caught: Observable<any>)=>{
        return this.errorHandler.processError(error);
      })
      );
  }
  constructor(private _http:HttpClient, private errorHandler: ErrorHandlerService) { }
}
