import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { LoginComponent } from './componets/ITAdmin/login/login.component';
import { RegistrationComponent } from './componets/ITAdmin/registration/registration.component';
import { AppRoutingModule } from '../app/app.routing.module';
import { MaterialModuleModule } from './material-module/material-module.module';
import { RouterModule } from '@angular/router';
import { GenralGuard } from './services/genral.guard';
import { AuthService} from '../app/services/auth.service';
//import { UserService} from '../app/services/user.service';
import { ItAdminService } from '../app/services/it-admin.service'
import { AuthGuard } from  '../app/services/auth.guard';
import {TokenInterceptor} from '../app/services/token.interceptor';
import {ErrorHandlerService} from '../app/services/error-handler.service';
import { AuthStorageService } from './services/auth-storage.service';
import { EmployeeMasterComponent } from './componets/HRPayroll/employee-master/employee-master.component';
import { LandingPageComponent } from './componets/ITAdmin/landing-page/landing-page.component';
import { DashboardComponent } from './componets/ITAdmin/dashboard/dashboard.component';
import { AdminUserComponent } from './componets/ITAdmin/admin-user/admin-user.component';
import { UserProfileComponent } from './componets/HRPayroll/user-profile/user-profile.component';
import { ChangePasswordComponent } from './componets/ITAdmin/change-password/change-password.component';
import { CustomerMasterComponent} from './componets/SalesEstimation/customer-master/customer-master.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BankMasterComponent } from './componets/Finance/bank-master/bank-master.component';
import { TicketDetailsComponent } from './componets/ticket-details/ticket-details.component';
import { WINDOW_PROVIDERS } from './services/window.providers';
import { ReportsComponent } from './componets/reports/reports.component';
import { ReportViewerModule } from 'ngx-ssrs-reportviewer';
import { PurchaseOrderComponent } from './componets/reports/purchase-order/purchase-order.component';
import { PoListComponent } from './componets/Procurement/po-list/po-list.component';
import { RfqListComponent } from './componets/Procurement/rfq-list/rfq-list.component';
import { PrListComponent } from './componets/Procurement/pr-list/pr-list.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { SalesInvoiceListComponent } from './componets/SalesEstimation/sales-invoice-list/sales-invoice-list.component';







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    EmployeeMasterComponent,
    LandingPageComponent,
    DashboardComponent,
    AdminUserComponent,
    UserProfileComponent,
    ChangePasswordComponent,
    CustomerMasterComponent,
    SidenavComponent,
    BankMasterComponent,
    TicketDetailsComponent,
    ReportsComponent,
    PurchaseOrderComponent,
    PoListComponent,
    RfqListComponent,
    PrListComponent,
    SalesInvoiceListComponent,
 
    
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ToastrModule.forRoot(  {positionClass: 'toast-bottom-right'}),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModuleModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    ReportViewerModule,
    NgxSpinnerModule,
   // ProgressSpinnerMode,
    

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },AuthService, WINDOW_PROVIDERS, ItAdminService, AuthGuard ,AuthStorageService,GenralGuard,ErrorHandlerService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
