import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule} from '@angular/router'
import {LoginComponent} from 'app/componets/ITAdmin/login/login.component';
import {RegistrationComponent} from 'app/componets/ITAdmin/registration/registration.component';
import { AuthGuard } from './services/auth.guard';
import { GenralGuard } from './services/genral.guard';
import { EmployeeMasterComponent } from './componets/HRPayroll/employee-master/employee-master.component';
import { LandingPageComponent } from './componets/ITAdmin/landing-page/landing-page.component';
import { DashboardComponent } from './componets/ITAdmin/dashboard/dashboard.component';
import { AdminUserComponent } from './componets/ITAdmin/admin-user/admin-user.component';
import { UserProfileComponent } from './componets/HRPayroll/user-profile/user-profile.component';
import { ChangePasswordComponent } from './componets/ITAdmin/change-password/change-password.component';
import { CustomerMasterComponent } from './componets/SalesEstimation/customer-master/customer-master.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BankMasterComponent } from './componets/Finance/bank-master/bank-master.component';
import { TicketDetailsComponent } from './componets/ticket-details/ticket-details.component';
import { ReportsComponent } from './componets/reports/reports.component';
import { PurchaseOrderComponent } from './componets/reports/purchase-order/purchase-order.component';
import { PoListComponent } from './componets/Procurement/po-list/po-list.component';
import { RfqListComponent } from './componets/Procurement/rfq-list/rfq-list.component';
import { PrListComponent } from './componets/Procurement/pr-list/pr-list.component';
import { SalesInvoiceListComponent } from './componets/SalesEstimation/sales-invoice-list/sales-invoice-list.component';
import { NewInvoiceComponent} from './componets/SalesEstimation/new-invoice/new-invoice.component';
import { SalesInvoiceReportComponent } from './componets/SalesEstimation/sales-invoice-report/sales-invoice-report.component';












const routes: Routes=[
{ path: '',component:LoginComponent,canActivate: [GenralGuard]},
{ path: 'login',component:LoginComponent,canActivate: [GenralGuard]},
{ path: 'registration',component:RegistrationComponent ,canActivate: [GenralGuard]},
{ path: 'home',component:LandingPageComponent,canActivate : [AuthGuard], children:[
{ path: 'sidenav',component:SidenavComponent,canActivate: [AuthGuard]},
{ path: '',component:DashboardComponent,canActivate : [AuthGuard]},
{ path: 'users',component:AdminUserComponent,canActivate : [AuthGuard]},
{ path: 'user-profile',component:UserProfileComponent,canActivate : [AuthGuard]},
{ path: 'employee-master-details',component:EmployeeMasterComponent,canActivate : [AuthGuard]},
{ path: 'change-password',component:ChangePasswordComponent,canActivate : [AuthGuard]},
{ path: 'customer-master-details',component:CustomerMasterComponent,canActivate:[AuthGuard]},
{ path: 'bank-master-details',component:BankMasterComponent,canActivate:[AuthGuard]},
{ path: 'ticket-details',component:TicketDetailsComponent,canActivate:[AuthGuard]},
{ path: 'reports',component:ReportsComponent,canActivate:[AuthGuard]},
{ path: 'purchase-order',component:PurchaseOrderComponent,canActivate:[AuthGuard]},
{ path: 'po-list',component:PoListComponent,canActivate:[AuthGuard]},
{ path: 'rfq-list',component:RfqListComponent,canActivate:[AuthGuard]},
{ path: 'pr-list',component:PrListComponent,canActivate:[AuthGuard]},
{ path: 'sales-invoice-list',component:SalesInvoiceListComponent,canActivate:[AuthGuard]},
{ path: 'new-invoice',component:NewInvoiceComponent,canActivate:[AuthGuard]},
{path: 'sales-invoice-report',component:SalesInvoiceReportComponent,canActivate:[AuthGuard]},

]
},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  declarations: []
})
export class AppRoutingModule { }
