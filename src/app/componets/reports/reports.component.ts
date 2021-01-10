import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  reportServer: string = 'http://192.168.16.9:403/reports/report/Department%20Report/Human%20Resource/EmployeeHeadCount';
  reportUrl: string = 'http://192.168.16.9:403/reports/report/Department%20Report/Human%20Resource/EmployeeHeadCount';
 showParameters: string = "true"; 
  // parameters: any = {
  //  "SampleStringParameter": null,
  //  "SampleBooleanParameter" : false,
  //  "SampleDateTimeParameter" : "11/1/2020",
  //  "SampleIntParameter" : 1,
  //  "SampleFloatParameter" : "123.1234",
  //  "SampleMultipleStringParameter": ["Parameter1", "Parameter2"]
  //  };
  language: string = "en-us";
  width: number = 100;
  height: number = 100;
  toolbar: string = "true";
  constructor() {

   }

  ngOnInit(): void {
  }

}
