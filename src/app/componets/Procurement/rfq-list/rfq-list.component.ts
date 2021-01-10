import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableUtil } from "../../../shared/tableUtil";
import { MatTableDataSource } from '@angular/material/table';
import {ProcurementService } from '../../../services/procurement.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rfq-list',
  templateUrl: './rfq-list.component.html',
  styleUrls: ['./rfq-list.component.css']
})
export class RfqListComponent  {
displayedColumns: string[] = [ 
    "rfqNo",
    "amendmentNo",
    "projectNo",
    "rfqDate",
    "dueDate",
    "rfqTypeName",
    "rfqStatusName",
    "supName",
    "contactPersonName",
    "rfqByName",
    "country",
    "paymentTerms",
    "currency",
   // "rfqoValue",
   // "discountAmt",
    "contactID",
    //"shipmentterms",
   // "taxcode",
    "shippingMode",
   // "vendorQuoteNo",
    "warehouse",
  //  "amendmentDate",
  //"rfqBy",
 ];
 
 @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
 @ViewChild(MatSort, { static: true }) sort: MatSort;
 dataSource: MatTableDataSource<any>;
  updateForm: any;
  statusResponses: any;
  rfqDetails: any;

  constructor(private procurementService: ProcurementService) {
    this.poStatus();
    this.updateForm = new FormGroup({
      filterstatus: new FormControl(""),
    });

    this.procurementService.rfqList().subscribe((res:any)=>
    {
      if (res !== null) {
        this.rfqDetails=res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
   }
  poStatus() {
    this.procurementService.poStatus().subscribe((res: any) => {
      if (res !== null) {
        this.statusResponses = res;
      }
    });
  }
  ngAfterViewInit() {}
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  exportTable() {
    TableUtil.exportToExcel("RFQTable");
  }

  filterData() {
    if (this.updateForm.get("filterstatus").value !== "All") {
      let filter = this.rfqDetails.filter(
        (obj) => obj.rfqStatus === this.updateForm.get("filterstatus").value
      );
      this.dataSource = new MatTableDataSource(filter);
    } else {
      this.dataSource = new MatTableDataSource(this.rfqDetails);
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  RadiofilterData(data) {
    let empId = localStorage.getItem("empID");
   // console.log("empid",empId);
    if (data.value === "2") {
      let filter = this.rfqDetails.filter(
        (obj) => obj.rfqBy === Number(empId)
      );
      this.dataSource = new MatTableDataSource(filter);
    } else if (data.value === "1") {
      let filter = this.rfqDetails.filter(
        (obj) => obj.rfqBy === Number(empId)
      );
      this.dataSource = new MatTableDataSource(filter);
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
