import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { TableUtil } from "../../../shared/tableUtil";
import { MatTableDataSource } from "@angular/material/table";
import {ProcurementService } from '../../../services/procurement.service';
import { analyzeAndValidateNgModules } from "@angular/compiler";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-po-list",
  templateUrl: "./po-list.component.html",
  styleUrls: ["./po-list.component.css"],
})
export class PoListComponent {
  displayedColumns: string[] = [
    "poNo",
    "amendmentNo",
    "projectNo",
    "poDate",
    "dueDate",
    "poTypeName",
    "poStatusName",
    "rfqNo",
    "supName",
    "contactPersonName",
    "poByName",
    "country",
    "paymentTerms",
    "currency",
    "poValue",
    "shipmentterms",
    "taxcode",
    "shippingMode",
    "vendorQuoteNo",
    "warehouse",
    "amendmentDate",
    "approvalDate",
    // "expDeliveryDate",
    // "poStatusDesc",
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  pomasterDetails: any;
  statusResponses: any;
  updateForm: any;
  poDetails: any;
  showSpinner :any;
  constructor(private procurementService: ProcurementService) {
    this.poStatus();
    this.updateForm = new FormGroup({
      filterstatus: new FormControl(""),
    });
    this.showSpinner = true;
    // empId: new FormControl(localStorage.getItem("empID")),

    // let empId = localStorage.getItem("empID");
    this.procurementService.poMaster().subscribe((res: any) => {
      if (res !== null) {
        //this.pomasterDetails = res;
        //let filter = this.pomasterDetails.filter(
        //(obj) =>  obj.poBy === Number(empId)
        // );
        this.showSpinner = false;
        this.poDetails = res;
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
  filterData() {
    if (this.updateForm.get("filterstatus").value !== "All") {
      let filter = this.poDetails.filter(
        (obj) => obj.poStatus === this.updateForm.get("filterstatus").value
      );
      //filter = filter.sort((x, y) => x.ticketId > y.ticketId ? -1 : 1);
      this.dataSource = new MatTableDataSource(filter);
    } else {
      // const filter = this.poDetails.sort((x, y) => x.ticketId > y.ticketId ? -1 : 1);

      this.dataSource = new MatTableDataSource(this.poDetails);
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  RadiofilterData(data) {
    let empId = localStorage.getItem("empID");
   // console.log("empid",empId);
    if (data.value === "2") {
      let filter = this.poDetails.filter(
        (obj) => obj.poBy === Number(empId)
      );
      this.dataSource = new MatTableDataSource(filter);
    } else if (data.value === "1") {
      let filter = this.poDetails.filter(
        (obj) => obj.poBy === Number(empId)
      );
      this.dataSource = new MatTableDataSource(filter);
    }
    // this.dataSource = new MatTableDataSource(res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  exportTable() {
    TableUtil.exportToExcel("PoTable");
  }
}
