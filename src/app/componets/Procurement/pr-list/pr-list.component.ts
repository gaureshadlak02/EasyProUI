import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableUtil } from "../../../shared/tableUtil";
import { MatTableDataSource } from '@angular/material/table';
import {ProcurementService } from '../../../services/procurement.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { FormControl,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pr-list',
  templateUrl: './pr-list.component.html',
  styleUrls: ['./pr-list.component.css']
})
export class PrListComponent  {
  displayedColumns: string[] = [ 
    "prNo",
    "amendmentNo",
    "prProjectID",
    "prDate",
    "requiredDate",
    "prTypeName",
    "prStatusName",
    "prNotes",
    "pRbyName",
    "prCurrency",
    "warehouse",
    "amendmentDate",
    "prApprovalDt",
    "createdBy",
    "createdDate",
    "lastModifiedBy",
    "lastModifiedDate",
  ];

 @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
 @ViewChild(MatSort, { static: true }) sort: MatSort;
 dataSource: MatTableDataSource<any>;
 statusResponses: any;
 updateForm: any;
 prDetails: any;

  constructor(private procurementService: ProcurementService) {
    this.poStatus();
    this.updateForm = new FormGroup({
      filterstatus: new FormControl(""),
    });

    this.procurementService.prList().subscribe((res:any)=>
    {
      if (res !== null) {
        this.prDetails = res;
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
  // ngOnInit(): void {
  // }

  ngAfterViewInit() {}
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  exportTable() {
    TableUtil.exportToExcel("PRTable");
  }
  filterData() {
    if (this.updateForm.get("filterstatus").value !== "All") {
      let filter = this.prDetails.filter(
        (obj) => obj.prStatus === this.updateForm.get("filterstatus").value
      );
      this.dataSource = new MatTableDataSource(filter);
    } else {
      this.dataSource = new MatTableDataSource(this.prDetails);
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  RadiofilterData(data) {
    let empId = localStorage.getItem("empID");
   // console.log("empid",empId);
    if (data.value === "2") {
      let filter = this.prDetails.filter(
        (obj) => obj.prBy === Number(empId)
      );
      this.dataSource = new MatTableDataSource(filter);
    } else if (data.value === "1") {
      let filter = this.prDetails.filter(
        (obj) => obj.prBy === Number(empId)
      );
      this.dataSource = new MatTableDataSource(filter);
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
