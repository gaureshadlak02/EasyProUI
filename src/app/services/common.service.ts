import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpResponse, HttpErrorResponse, HttpEvent, HttpRequest} from '@angular/common/http';
import { catchError, switchMap} from 'rxjs/operators';
import { throwError, of, Observable} from 'rxjs';
import {baseUrl,UrlNames} from './url-provider';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  currencyRates(currencyCode: any,conversionDate:any) {
    //+"?taxcode="+taxcode+"&effectDate="+effectivedate
    return this._http.get(baseUrl+UrlNames.getCurrencyRates+"?currencyCode="+currencyCode+"&conversionDate="+conversionDate).pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError((error: any, caught: Observable<any>) => {
        return this.errorHandler.processError(error);
      })
    );
  }
  uomMaster() {
    return this._http.get(baseUrl+UrlNames.getUnitofMeasure).pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError((error: any, caught: Observable<any>) => {
        return this.errorHandler.processError(error);
      })
    );
  }

  currencyMaster() {
    return this._http.get(baseUrl+UrlNames.getCurrencies).pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError((error: any, caught: Observable<any>) => {
        return this.errorHandler.processError(error);
      })
    );
  }
  taxCodeMaster() {
    return this._http.get(baseUrl+UrlNames.taxCode).pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError((error: any, caught: Observable<any>) => {
        return this.errorHandler.processError(error);
      })
    );
  }
  payMaster() {
    return this._http.get(baseUrl+UrlNames.getPayTerms).pipe(
    switchMap((res: any) => {
      return of(res);
    }),
    catchError((error: any, caught: Observable<any>) => {
      return this.errorHandler.processError(error);
    })
  );
  }
  countryMaster() {
    return this._http.get(baseUrl+UrlNames.getCountries).pipe(
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
