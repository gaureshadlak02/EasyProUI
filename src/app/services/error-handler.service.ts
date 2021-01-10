import { Injectable } from '@angular/core';
import { Observable, throwError, EMPTY } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private toastr: ToastrService,
   ) {
   
  }

  processError(error: any): Observable<any> {
    if (error.status) {
    
      if (error.status === 401) {
        return EMPTY;
      } else if (error.status === 400) {
        this.toastr.error('Please Enter correct Email Id and Password');
        //this.toastr.error(error.statusText);
      } else {
        if (error.statusText) {
          this.toastr.error(error.statusText);
        }
        return EMPTY;
      }
    }
    return throwError(error);
  }
}
