import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sales-invoice-report',
  templateUrl: './sales-invoice-report.component.html',
  styleUrls: ['./sales-invoice-report.component.css']
})
export class SalesInvoiceReportComponent implements OnInit {
  
  reportServer: string = 'http://192.168.16.9:403/reports/report/Department%20Report/Finance/SalesInvoice';
  reportUrl: string =  'http://192.168.16.9:403/reports/report/Department%20Report/Finance/SalesInvoice';
  showParameters: string = "true"; 
  language: string = "en-us";
  width: number = 100;
  height: number = 100;
  toolbar: string = "true";
  invoiceNo: { InvoiceNo: any; };

  constructor(private route: ActivatedRoute,private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      this.invoiceNo ={"InvoiceNo":params['InvoiceNo']} ;
    });
   }

  ngOnInit(): void {
  }

}
