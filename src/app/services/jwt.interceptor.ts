import 'rxjs/add/operator/do';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
//import { AuthService } from './auth.service';
import {ItAdminService } from '../services/it-admin.service';
import { ToastrService } from "ngx-toastr";
import { Observable } from 'rxjs';
export class JwtInterceptor implements HttpInterceptor {
  constructor(public itAdminService: ItAdminService, private toastr: ToastrService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
            this.toastr.error('Session expired');
          // redirect to the login route
          // or show a modal
        }
        if (err.status === 500) {
            this.toastr.error('Internal server eroor');
            // redirect to the login route
            // or show a modal
          }
      }
    });
  }
}