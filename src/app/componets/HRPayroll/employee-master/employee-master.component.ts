import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { HrpayrollService } from '../../../services/hrpayroll.service';
import { TableUtil } from "../../../shared/tableUtil";
import { from } from "rxjs";
@Component({
  selector: "app-employee-master",
  templateUrl: "./employee-master.component.html",
  styleUrls: ["./employee-master.component.css"],
})
export class EmployeeMasterComponent {
  displayedColumns: string[] = [
    "empID",
    "empName",
    "designation",
    "department",
    "payRollGroup",
    "jobPosition",
    "accessLevel",
    "active",
    "sex",
    "doj",
    "resourceCenter",
    "passportNo",
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  constructor(private hrpayrollService: HrpayrollService) {
    this.hrpayrollService.employeeMaster().subscribe((res: any) => {
      if (res !== null) {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
    TableUtil.exportToExcel("EmployeeTable");
  }
}
