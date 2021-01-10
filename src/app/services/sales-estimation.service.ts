import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpResponse, HttpErrorResponse, HttpEvent, HttpRequest} from '@angular/common/http';
import { catchError, switchMap} from 'rxjs/operators';
import { throwError, of, Observable} from 'rxjs';
import {baseUrl,UrlNames} from './url-provider';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class SalesEstimationService {
  
  customerPostingGlAcctMaster() {
    return this._http.get(baseUrl+UrlNames.customerPostingGlAcct).pipe(
    switchMap((res: any) => {
      return of(res);
    }),
    catchError((error: any, caught: Observable<any>) => {
      return this.errorHandler.processError(error);
    })
  );
  }
  contactMaster() {
    return this._http.get(baseUrl+UrlNames.getContacts).pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError((error: any, caught: Observable<any>) => {
        return this.errorHandler.processError(error);
      })
    );
  }
  customerMaster(){
    return this._http.get(baseUrl+UrlNames.CustomerMaster).pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError((error: any, caught: Observable<any>) => {
        return this.errorHandler.processError(error);
      })
    );
  }
  customerMasterUpdate(reqParams: any){
    return this._http.post(baseUrl+UrlNames.customerMasterUpdate, reqParams).pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError((error: any, caught: Observable<any>) => {
        return this.errorHandler.processError(error);
      })
    );
  }

  customerMasterdeletefun(id: any) {
    return this._http.post(baseUrl+UrlNames.customerMasterdelete+id, {}).pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError((error: any, caught: Observable<any>) => {
        return this.errorHandler.processError(error);
      })
    );
  }



  poStatus() {
    return this._http.get(baseUrl+UrlNames.POStatus).pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError((error: any, caught: Observable<any>) => {
        return this.errorHandler.processError(error);
      })
    );
  }
  salesInvoice() {
    return this._http.get(baseUrl+UrlNames.SalesInvoice).pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError((error: any, caught: Observable<any>) => {
        return this.errorHandler.processError(error);
      })
    );
  }

  constructor(private _http:HttpClient, private errorHandler: ErrorHandlerService) { }
}
