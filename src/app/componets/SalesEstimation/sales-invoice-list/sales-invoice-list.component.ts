import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { TableUtil } from "../../../shared/tableUtil";
import { MatTableDataSource } from "@angular/material/table";
import { analyzeAndValidateNgModules } from "@angular/compiler";
import { FormControl, FormGroup } from "@angular/forms";
import { SalesEstimationService } from "../../../services/sales-estimation.service";

@Component({
  selector: "app-sales-invoice-list",
  templateUrl: "./sales-invoice-list.component.html",
  styleUrls: ["./sales-invoice-list.component.css"],
})
export class SalesInvoiceListComponent {
  displayedColumns: string[] = [
    "invoiceNo",
    "invoiceDate",
    "projectNo",
    "customerCode",
    "customerName",
    "billingCustomerCode",
    "billedCustomerName",
    "billingContact",
    "bank",
    "currency",
    "totalInvoiceValue",
    "totalInvoiceValueLCY",
    "totalPaidAmount",
    "totalPaidAmountLCY",
    "paymentTermsCode",
    "paymenMethod",
    "taxCode",
    "vatPercentage",
    "vatAmount",
    "vatAmountLCY",
    "sI_CNOTE",
    "sI_COUNT",
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  updateForm: any;
  showSpinner: any;
  poDetails: any;
  statusResponses:any;

  constructor(private salesEstimationService: SalesEstimationService) {
    this.poStatus();
    this.updateForm = new FormGroup({
      filterstatus: new FormControl(""),
    });
    this.showSpinner = true;
    this.salesEstimationService.salesInvoice().subscribe((res: any) => {
      if (res !== null) {
        this.showSpinner = false;
        this.poDetails = res;
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
  poStatus() {
    this.salesEstimationService.poStatus().subscribe((res: any) => {
      if (res !== null) {
        this.statusResponses = res;
      }
    });
  }
  //ngOnInit(): void {}
  filterData() {
    if (this.updateForm.get("filterstatus").value !== "All") {
      let filter = this.poDetails.filter(
        (obj) => obj.sI_Status === this.updateForm.get("filterstatus").value
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
      let filter = this.poDetails.filter((obj) => obj.poBy === Number(empId));
      this.dataSource = new MatTableDataSource(filter);
    } else if (data.value === "1") {
      let filter = this.poDetails.filter((obj) => obj.poBy === Number(empId));
      this.dataSource = new MatTableDataSource(filter);
    }
    // this.dataSource = new MatTableDataSource(res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  exportTable() {
    TableUtil.exportToExcel("SalesInvoiceTable");
  }
}
