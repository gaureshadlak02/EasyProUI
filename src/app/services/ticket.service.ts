import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpResponse, HttpErrorResponse, HttpEvent, HttpRequest} from '@angular/common/http';
import { catchError, switchMap} from 'rxjs/operators';
import { throwError, of, Observable} from 'rxjs';
import {baseUrl,UrlNames} from './url-provider';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  ticketDetailsRemark(ticketId: any) {
    return this._http.get(baseUrl+UrlNames.TicketDetailsRemark+"?TicketId="+ticketId, {}).pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError((error: any, caught: Observable<any>) => {
        return this.errorHandler.processError(error);
      })
    );
  }
  ticketMasterdelete(ticketId: any) {
    return this._http.post(baseUrl+UrlNames.TicketMasterDelete+ticketId, {}).pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError((error: any, caught: Observable<any>) => {
        return this.errorHandler.processError(error);
      })
    );
  }
  ticketDetailsUpdate(body: any) {
    return this._http.post(baseUrl+UrlNames.TicketDetailsUpdate, body).pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError((error: any, caught: Observable<any>) => {
        return this.errorHandler.processError(error);
      })
    );
  }
  ticketDetails(empId:any) {
    return this._http.get(baseUrl+UrlNames.TicketDetails+"?empId="+empId).pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError((error: any, caught: Observable<any>) => {
        return this.errorHandler.processError(error);
      })
    );
  }
 
  AddNewTicket(body: any) {
    return this._http.post(baseUrl+UrlNames.AddNewTicket, body).pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError((error: any, caught: Observable<any>) => {
        return this.errorHandler.processError(error);
      })
    );
   
  }
  SendEmailTicket(body:any){
    return this._http.post(baseUrl+UrlNames.SendEmailTicket, body).pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError((error: any, caught: Observable<any>) => {
        return this.errorHandler.processError(error);
      })
    );
  }
  UploadAttachment(file: File,TicketId:string): Observable<HttpEvent<any>> {
    let formData = new FormData();
    formData.append('Image', file);
    formData.append('TicketId', TicketId);
    //console.log("formData",formData) ;
    const req = new HttpRequest('POST',baseUrl+UrlNames.AddTicketAttach, formData);
    return this._http.request(req);
  }
  
  departmentMaster() {
    return this._http.get(baseUrl+UrlNames.departmentMaster).pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError((error: any, caught: Observable<any>) => {
        return this.errorHandler.processError(error);
      })
    );
  }
  categoryMaster() {
    return this._http.get(baseUrl+UrlNames.categoryMaster).pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError((error: any, caught: Observable<any>) => {
        return this.errorHandler.processError(error);
      })
    );
  }
  priorityMaster() {
    return this._http.get(baseUrl+UrlNames.priorityMaster).pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError((error: any, caught: Observable<any>) => {
        return this.errorHandler.processError(error);
      })
    );
  }
  statusMaster() {
    return this._http.get(baseUrl+UrlNames.statusMaster).pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError((error: any, caught: Observable<any>) => {
        return this.errorHandler.processError(error);
      })
    );
  }
  employeeMaster() { 
    return this._http.get(baseUrl+UrlNames.EmployeeMaster).pipe(
    switchMap((res: any) => {
      return of(res);
    }),
    catchError((error: any, caught: Observable<any>) => {
      return this.errorHandler.processError(error);
    })
  );
  }

   sourceMaster() {
    return this._http.get(baseUrl+UrlNames.getSources).pipe(
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
