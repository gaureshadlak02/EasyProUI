import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {
  poNo:any;
 // reportServer: string = 'http://192.168.16.9:403/reports/report/Department%20Report/Procurement/PurchaseOrder';
 // reportUrl: string = 'http://192.168.16.9:403/reports/report/Department%20Report/Procurement/PurchaseOrder';
  reportServer: string = 'http://192.168.16.9:403/reports/report/PurchaseOrder';
  reportUrl: string = 'http://192.168.16.9:403/reports/report/PurchaseOrder';
  showParameters: string = "true"; 
  language: string = "en-us";
  width: number = 100;
  height: number = 100;
  toolbar: string = "true";
  //autoAuth:string="true";
  constructor(private route: ActivatedRoute,private http: HttpClient) { 
    this.route.queryParams.subscribe(params => {
      this.poNo ={"PONo":params['PONo']} ;
  });
  }
//   auth = ('zhiltd.com\administrator:Admin#2021$IT');
//   endpoint = 'http://192.168.16.9:403/reports/report/PurchaseOrder';
//   httpOptions = {
//   headers: new HttpHeaders({
//     'Authorization': 'Basic' + btoa(this.auth),
//     'Content-Type':  'application/json'
//   })
// };

  ngOnInit(): void {
  }

}
