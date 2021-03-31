import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  ComponentRef,
  AfterViewInit,
  Inject,
  TemplateRef,
  ViewContainerRef,
  ElementRef,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { TableUtil } from "../../../shared/tableUtil";
import { MatTableDataSource } from "@angular/material/table";
import { analyzeAndValidateNgModules } from "@angular/compiler";
import { FormControl, FormGroup } from "@angular/forms";
import { SalesEstimationService } from "../../../services/sales-estimation.service";
import { NewInvoiceComponent } from "../../SalesEstimation/new-invoice/new-invoice.component";
import { CommonService } from "app/services/common.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-sales-invoice-list",
  templateUrl: "./sales-invoice-list.component.html",
  styleUrls: ["./sales-invoice-list.component.css"],
})
export class SalesInvoiceListComponent {
  @ViewChild("addModal", { static: false }) addModal: ElementRef;
  @ViewChild("closeModal", { static: false }) closeModal: ElementRef;
  @ViewChild("addStatusModal", { static: false }) addStatusModal: ElementRef;
  @ViewChild("closeStatusModal", { static: false })
  closeStatusModal: ElementRef;
  invoiceNo: number = 0;
  customerCode: string = "";
  creditNoteMemoResponse: any;
  creditMemoAccount: number = 0;
  totalInvoiceValue: number = 0;
  txtCreditNoteDate: string = "";
  cr_Reason: string = "";
  reasonType: string = "OT";
  selectedInvoiceData: any = null;
  currencyRatesResponses: number = 0;
  submitted: boolean = false;
  salesinvoiceDetails: any;
  displayedColumns: string[] = [
    "Update",
    "sI_INVOICENO",
    "invoiceNo",
    "invoiceDate",
    "dueDate",
    "projectNo",
    // "customerCode",
    // "customerName",
    // "billingCustomerCode",
    "billedCustomerName",
    "creditNoteAmount",
    // "billingContact",
    // "bank",
    "currency",
    "totalInvoiceValue",
    "totalInvoiceValueLCY",
    "totalPaidAmount",
    "totalPaidAmountLCY",
    "balanceAmount",
    "statusName",
    // "sI_Status",
    "createdByName",
    "createdDate",
    "lastModifiedBy",
    "lastModifiedDate",
    "Delete",
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("appenHere", { static: true, read: ViewContainerRef })
  target: ViewContainerRef;
  dataSource: MatTableDataSource<any>;
  updateForm: any;
  showSpinner: any;
  poDetails: any;
  statusResponses: any;
  componentRef: any;
  slno: number = 0;
  docSlno: number = 0;
  revisionNo: number = 0;
  txtremarks: string = "";
  LstApprovalType: string = "";
  docNo: number = 0;
  constructor(
    private salesEstimationService: SalesEstimationService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private commonService: CommonService,
    private toastr: ToastrService,
    private route: Router
  ) {
    this.poStatus();
    this.salesInvoice();
    this.updateForm = new FormGroup({
      filterstatus: new FormControl(""),
    });
    this.showSpinner = true;
    this.bindInvoiceList();
    localStorage.setItem("invoiceNo", "0");
  }
  addNewComponent() {
    let childComponent = this.componentFactoryResolver.resolveComponentFactory(
      NewInvoiceComponent
    );
    this.componentRef = this.target.createComponent(childComponent);
  }
  // Get Record form SalesInvoiceHeaderView View
  bindInvoiceList() {
    this.salesEstimationService.salesInvoice().subscribe((res: any) => {
      if (res !== null) {
        this.showSpinner = false;
        this.poDetails = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // console.log(this.poDetails);
      }
    });
  }
  // Get Record form Sales_Invoice table
  salesInvoice() {
    this.salesEstimationService.GetSalesInvoice().subscribe((res: any) => {
      if (res !== null) {
        this.salesinvoiceDetails = res;
        // console.log(this.salesinvoiceDetails);
      }
    });
  }

  ngAfterViewInit() {}
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  //Calling webapi for PO status
  poStatus() {
    this.salesEstimationService.poStatus().subscribe((res: any) => {
      if (res !== null) {
        this.statusResponses = res;
        //  console.log(this.statusResponses)
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
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //Export the data in excel format
  exportTable() {
    TableUtil.exportToExcel("SalesInvoiceTable");
  }
  //Calling webapi for Curency converstion according Credit note date and currency
  currencyRates(currencyCode, conversionDate) {
    this.commonService
      .currencyRates(currencyCode, conversionDate)
      .subscribe((res: any) => {
        if (res !== null) {
          this.currencyRatesResponses = res;
          let creditNoteReq = {
            cr_VocNo: 0,
            cr_VocDate: this.txtCreditNoteDate,
            cr_CusCode: this.customerCode,
            cr_Currency: this.selectedInvoiceData.currency,
            cr_Amount: this.totalInvoiceValue,
            cr_CreditAmt: this.currencyRatesResponses * this.totalInvoiceValue,
            cr_InvoiceNo: this.selectedInvoiceData.invoiceNo,
            cr_Reason: this.cr_Reason,
            cr_DebitGlCode: this.creditMemoAccount,
            cr_ProjectID: this.selectedInvoiceData.projectNo,
            reasonType: this.reasonType,
            compID: 1,
            branchID: 1,
            cr_UserID: parseInt(localStorage.getItem("empID")),
            cr_SysDate: new Date(),
            lastModifiedBy: null,
            lastModifiedDate: null,
          };

          let selectedInvoice = this.salesinvoiceDetails.filter(
            (a) => a.sI_NO === creditNoteReq.cr_InvoiceNo
          )[0];
          selectedInvoice.sI_Status = "A";
          // console.log(selectedInvoice);
          //Calling webapi for insert data in credit note table
          this.salesEstimationService
            .AddUpdateCreditNote(creditNoteReq)
            .subscribe(
              (resp: any) => {
                this.salesEstimationService
                  .saveInvoice(selectedInvoice)
                  .subscribe(
                    (resp: any) => {
                      this.toastr.success("Credit Note added successfully!");
                      this.bindInvoiceList();
                      this.closeModal.nativeElement.click();
                    },
                    (error) => {
                      this.toastr.error("Credit Note added failed!");
                    }
                  );
              },
              (error) => {
                this.toastr.error("Credit Note added failed!");
              }
            );
        }
      });
  }

  get isValidTotalInvoiceAmount() {
    if (
      this.selectedInvoiceData !== null &&
      parseFloat(this.totalInvoiceValue.toString()) >= 1 &&
      parseFloat(this.totalInvoiceValue.toString()) <=
        this.selectedInvoiceData.totalInvoiceValue
    )
      return true;
    else return false;
  }
  notifiedPaidAmount(element) {
    this.toastr.info("Page is under construction!");
  }

  // select Element of credit not memo column and checking the Open Credit Note Model Popup only status is In progress.
  openCreditNotePopup(element) {
    if (element.sI_Status === "P") {
      this.selectedInvoiceData = element;
      this.invoiceNo = element.invoiceNo;
      this.customerCode = element.customerCode;
      this.totalInvoiceValue = element.totalInvoiceValue;
      //Calling webapi for select GLCode passing parameter of CustomerCode and CreditnoteDate
      this.salesEstimationService
        .getGLCode(this.customerCode)
        .subscribe((resp) => {
          this.creditNoteMemoResponse = resp;
          if (
            this.creditNoteMemoResponse !== null &&
            this.creditNoteMemoResponse !== undefined
          ) {
            this.creditMemoAccount = this.creditNoteMemoResponse.creditMemoAccount;
            this.txtCreditNoteDate = new Date().toISOString().split("T")[0];
          }
        });
      this.addModal.nativeElement.click();
    } else {
      this.toastr.info("Please select only In Progress status!");
    }
  }
  //Curency converstion according Credit note date and currency
  saveCreditNote() {
    this.submitted = true;
    if (this.isValidTotalInvoiceAmount && this.cr_Reason) {
      let currencyDateForCurrency =
        new Date(this.txtCreditNoteDate).getFullYear() +
        "-" +
        (Number(new Date(this.txtCreditNoteDate).getMonth()) + 1) +
        "-" +
        new Date(this.txtCreditNoteDate).getDate();
      this.currencyRates(
        this.selectedInvoiceData.currency,
        currencyDateForCurrency
      );
    }
  }
  editSalesItem(invoice) {
    if (invoice.sI_Status === "P") {
      localStorage.setItem("invoiceNo", invoice.invoiceNo);
      this.route.navigate(["/home/new-invoice"]);
    } else {
      localStorage.setItem("invoiceNo", "0");
      this.toastr.info("Invoice Status should be Pending");
    }
  }
  deleteSalesInvoice() {
    this.toastr.info("Unable to Delete...!");
  }

  getApprovalTable(invoiceNo: number) {
    this.commonService.GetApprovalTable().subscribe((resp) => {
      if (resp) {
        //this.slno = resp.length + 1;
        this.docSlno = resp.filter((a) => a.docNo === invoiceNo).length + 1;
        this.revisionNo = this.docSlno;
        //console.log("approve" ,resp.slno)
      }
    });
  }
  openStatusPopup(element) {
    this.docNo = element.invoiceNo;
    this.getApprovalTable(element.invoiceNo);
    this.addStatusModal.nativeElement.click();
  }
  saveApprovalType() {
    //console.log("txtremarks", this.txtremarks);
    // console.log("LstApprovalType", this.LstApprovalType);

    let saveStatusRequest = {
      slno: 0,
      docType: 13,
      docNo: this.docNo,
      docSlno: this.docSlno,
      revisionNo: this.revisionNo,
      moduleID: 13 + "-" + this.docNo + "-" + this.docSlno,
      approvalStatus: this.LstApprovalType,
      approvedBy: localStorage.getItem("empID"),
      approvedDate: new Date(),
      approvalRemarks: this.txtremarks,
      compID: 1,
      branchID: 1,
      requestedBy: localStorage.getItem("empID"),
      requestedDate: new Date(),
      aprovalWindowPath: null,
    };
    let selectedInvoice = this.salesinvoiceDetails.filter(
      (a) => a.sI_NO === saveStatusRequest.docNo
    )[0];
    selectedInvoice.sI_Status = this.LstApprovalType;
    this.commonService.AddUpdateApprovalTable(saveStatusRequest).subscribe(
      (res: any) => {
        // console.log("saveStatusRequest" ,saveStatusRequest);
        this.salesEstimationService.saveInvoice(selectedInvoice).subscribe(
          (resp: any) => {
            this.toastr.success("Added Sucessfully");
            this.bindInvoiceList();
            this.closeStatusModal.nativeElement.click();
          },
          (error) => {
            this.toastr.error("Approval added failed!");
          }
        );
      },
      (error) => {
        this.toastr.error("Approval added failed!");
      }
    );
  }
}
