import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpResponse, HttpErrorResponse, HttpEvent, HttpRequest} from '@angular/common/http';
import { catchError, switchMap} from 'rxjs/operators';
import { throwError, of, Observable, from} from 'rxjs';
import {baseUrl,UrlNames} from './url-provider';
//import {UrlNames} from './url-provider';
//import {baseUrl}  from 'environments';
 //import {baseUrl} from '../../environments/environment.prod';
 import {environment} from '../../environments/environment';

import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class SalesEstimationService {
  contactByCustomercode(customerCode :any) {
    return this._http.get(baseUrl+UrlNames.GetContactByCustomerCode+"?customercode="+customerCode).pipe(
      switchMap((res:any)=>{
        return of (res)
      }),
      catchError((error: any, caught: Observable<any>) => {
       return this.errorHandler.processError(error);
      })
    );
  }
  getGLCode(cusCode: any) {
    return this._http.get(baseUrl+UrlNames.GetCustomerPostingGroupbyCustomer+"?cuscode="+cusCode).pipe(
      switchMap((res:any)=>{
        return of (res)
      }),
      catchError((error: any, caught: Observable<any>) => {
       return this.errorHandler.processError(error);
      })
    );
  }

  getGLName(gLCode) {
    return this._http.get(baseUrl+UrlNames.GetChartofAcctDesc+"?glCode="+gLCode).pipe(
      switchMap((res)=>{
        return of (res)
      }),
      catchError((error: any, caught: Observable<any>) => {
       return this.errorHandler.processError(error);
      })
    );
  }
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
  GetSalesInvoice() {
    return this._http.get(baseUrl+UrlNames.GetSalesInvoice).pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError((error: any, caught: Observable<any>) => {
        return this.errorHandler.processError(error);
      })
    );
  }
  GetSalesInvoiceItems() {
    return this._http.get(baseUrl+UrlNames.GetSalesInvoiceItems).pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError((error: any, caught: Observable<any>) => {
        return this.errorHandler.processError(error);
      })
    );
  }
  GetCreditNotes() {
    return this._http.get(baseUrl+UrlNames.GetCreditNote).pipe(
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
  saveInvoice(reqParams: any){
    return this._http.post(baseUrl+UrlNames.saveInvoice, reqParams).pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError((error: any, caught: Observable<any>) => {
        return this.errorHandler.processError(error);
      })
    );
  }
  saveInvoiceItem(reqParams: any){
    return this._http.post(baseUrl+UrlNames.saveInvoiceItem, reqParams).pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError((error: any, caught: Observable<any>) => {
        return this.errorHandler.processError(error);
      })
    );
  }

  AddUpdateCreditNote(reqParams: any){
    return this._http.post(baseUrl+UrlNames.AddUpdateCreditNote, reqParams).pipe(
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
