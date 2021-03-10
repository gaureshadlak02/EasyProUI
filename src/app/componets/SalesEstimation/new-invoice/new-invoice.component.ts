import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
  FormsModule,
} from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { CommonService } from "../../../services/common.service";
import { ProjectsService } from "../../../services/projects.service";
import { FinanceService } from "../../../services/finance.service";
import { SalesEstimationService } from "../../../services/sales-estimation.service";
import { TableUtil } from "../../../shared/tableUtil";
import { ToastrService } from "ngx-toastr";
import { from } from "rxjs";
import { AddInvoice, InvoiceAddItem } from "../models/invoice-item";
import { Router } from "@angular/router";

@Component({
  selector: "app-new-invoice",
  templateUrl: "./new-invoice.component.html",
  styleUrls: ["./new-invoice.component.css"],
})
export class NewInvoiceComponent {
  @ViewChild("addModal", { static: false }) addModal: ElementRef;
  dataSourceAddItem: MatTableDataSource<InvoiceAddItem>;
  invoiceItems: InvoiceAddItem[] = [];
  displayedColumns: string[] = [
    "sI_NO",
    "sI_DATE",
    "sI_CUSTOMER",
    "sI_PROJECT",
    "sI_CONTACT",
    "sI_CASHBANK",
    "isAdvance",
    "sI_PAYMENTTERMS",
    "sI_PAYMETHOD",
    "sI_CURRENCY",
    "sI_BILLSCHEDULE",
  ];
  today = new Date("DD/MM/YYYY");
  invoiceAddForm: FormGroup;
  itemAddForm: FormGroup;
  ProjectsService: any;
  projectResponses: any;
  currencyResponses: any;
  payTermsResponses: any;
  bankmasterDetails: any;
  billingScheduleResponses: any;
  billingCustomerResponses: any;
  contactResponses: any;
  glCodeResponses: any;
  uomResponses: any;
  taxCodeDetailResponses: any;
  customerResponses: any;
  taxCode: any;
  isChecked = true;
  grand_total: string = "0";
  currencyRatesResponses: number;
  currencyCode: any;
  salesinvoiceDetails: any;
  creditNotesDetails: any;
  sI_COUNT: number = 0;
  salesInvoiceNo: number = 0;
  formatinvoliceNo: string = "";
  totalProjectValue: number = 0;
  totalPrevInvValue: number = 0;
  totalPrevVATInvValue: number = 0;
  totalCreditNoteValue: number = 0;
  totalActualInvoiceValue: number = 0;
  totalItemInvoiceValue: number = 0;
  constructor(
    private projectsService: ProjectsService,
    private commonService: CommonService,
    private financeService: FinanceService,
    private salesEstimationService: SalesEstimationService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.invoiceAddForm = new FormGroup({
      sI_DATE: new FormControl(new Date()),
      // sI_DATE: new FormControl("",),
      sI_CUSTOMER: new FormControl("", [Validators.required]),
      sI_PROJECT: new FormControl("", [Validators.required]),
      sI_CONTACT: new FormControl("", [Validators.required]),
      sI_CASHBANK: new FormControl("", [Validators.required]),
      isAdvance: new FormControl(false),
      sI_PAYMENTTERMS: new FormControl("", [Validators.required]),
      sI_PAYMETHOD: new FormControl("", [Validators.required]),
      sI_CURRENCY: new FormControl("", [Validators.required]),
      sI_BILLSCHEDULE: new FormControl("", [Validators.required]),
    });
    this.projectMaster();
    this.currencyMaster();
    this.payMaster();
    this.bankMaster();
    this.glCodeMaster();
    this.uomMaster();
    this.taxCodeDetail();
    this.customerMaster();
    this.salesInvoice();
    this.creditNote();

    //  this.today.setDate(this.today.getDate());
    this.itemAddForm = new FormGroup({
      siD_SNO: new FormControl(""),
      sID_GLCODE: new FormControl("", [Validators.required]),
      sID_GLName: new FormControl(""),
      isRequired: new FormControl(true),
      siD_ITEMDESC: new FormControl("", [Validators.required]),
      siD_ITEMDESC_Arabic: new FormControl("", [Validators.required]),
      siD_BILLQTY: new FormControl("", [Validators.required]),
      siD_BILLWEIGHT: new FormControl(""),
      siD_IRATE: new FormControl("", [Validators.required]),
      siD_RATEPER: new FormControl("", [Validators.required]),
      vatPercent: new FormControl(""),
      vatAmount: new FormControl(""),
      siD_RATEUOM: new FormControl("", [Validators.required]),
      siD_TOTAL: new FormControl(""),
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.itemAddForm.controls[controlName].hasError(errorName);
  };
  salesInvoice() {
    this.salesEstimationService.GetSalesInvoice().subscribe((res: any) => {
      if (res !== null) {
        this.salesinvoiceDetails = res;
      }
    });
  }
  creditNote() {
    this.salesEstimationService.GetCreditNotes().subscribe((res: any) => {
      if (res !== null) {
        this.creditNotesDetails = res;
      }
    });
  }

  bankMaster() {
    this.financeService.bankMaster().subscribe((res: any) => {
      if (res !== null) {
        this.bankmasterDetails = res;
      }
    });
  }
  projectMaster() {
    this.projectsService.projectMaster().subscribe((res: any) => {
      if (res != null) {
        this.projectResponses = res;
      }
    });
  }
  payMaster() {
    this.commonService.payMaster().subscribe((res: any) => {
      if (res !== null) {
        this.payTermsResponses = res;
      }
    });
  }
  currencyMaster() {
    this.commonService.currencyMaster().subscribe((res: any) => {
      if (res !== null) {
        this.currencyResponses = res;
      }
    });
  }
  currencyRates(currencyCode, conversionDate) {
    this.commonService
      .currencyRates(currencyCode, conversionDate)
      .subscribe((res: any) => {
        if (res !== null) {
          this.currencyRatesResponses = res;
          // console.log("currencyRates",this.currencyRatesResponses);
        }
      });
  }
  billingScheduleByProejct() {
    this.projectsService
      .billingScheduleByProejct(this.invoiceAddForm.get("sI_PROJECT").value)
      .subscribe((res: any) => {
        if (res !== null) {
          this.billingScheduleResponses = res;
          // console.log("this.billingScheduleResponses",this.billingScheduleResponses);
        }
      });
  }

  billingCustomer() {
    this.projectsService
      .billingCustomer(this.invoiceAddForm.get("sI_PROJECT").value)
      .subscribe((res: any) => {
        if (res !== null) {
          this.billingCustomerResponses = res;
          //console.log("this.billingCustomerResponses",this.billingCustomerResponses);
          this.contactByCustomercode();
        }
      });
  }
  contactByCustomercode() {
    this.salesEstimationService
      .contactByCustomercode(this.invoiceAddForm.get("sI_CUSTOMER").value)
      .subscribe((res: any) => {
        if (res !== null) {
          this.contactResponses = res;
          // console.log("this.contactResponses", this.contactResponses);
        }
      });
  }
  customerMaster() {
    this.salesEstimationService.customerMaster().subscribe((res: any) => {
      if (res !== null) {
        this.customerResponses = res;
        // console.log("this.customerResponses", this.customerResponses);
      }
    });
  }

  glCodeMaster() {
    this.financeService.glCodeMaster().subscribe((res: any) => {
      if (res !== null) {
        // console.log("res",res);
        this.glCodeResponses = res;
      }
    });
  }

  uomMaster() {
    this.commonService.uomMaster().subscribe((res: any) => {
      if (res !== null) {
        //  console.log("res",res);
        this.uomResponses = res;
        this.itemAddForm.controls["siD_RATEUOM"].setValue("% ");
      }
    });
  }

  taxCodeDetail() {
    this.financeService.taxCodeDetail().subscribe((res: any) => {
      if (res !== null) {
        //console.log("res", res);
        this.taxCodeDetailResponses = res;
      }
    });
  }
  taxCodePercentage(taxcode, effectivedate) {
    this.financeService
      .taxCodePercentage(taxcode, effectivedate)
      .subscribe((res: any) => {
        if (res !== null) {
          // console.log("res", res);
          this.itemAddForm.controls["vatPercent"].setValue(res);
        }
      });
  }

  getGlCode() {
    this.salesEstimationService
      .getGLCode(this.invoiceAddForm.get("sI_CUSTOMER").value)
      .subscribe((res: any) => {
        if (res !== null) {
          //console.log("res", res);
          this.itemAddForm.controls["sID_GLCODE"].setValue(res.salesAccount);
          //console.log("res", res.salesAccount);
          this.salesEstimationService
            .getGLName(res.salesAccount)
            .subscribe((res1: any) => {
              if (res1 !== null) {
                //   console.log("res1", res1);
                this.itemAddForm.controls["sID_GLName"].setValue(res1.glName);
              }
            });
        }
      });
  }
  //Project selection change data
  onProjectChange(e: any) {
    // decimal totalPrevInvValue = db.Sales_Invoice.Where(wh => wh.SI_PROJECT == newSalesInvoice.SI_PROJECT && wh.SI_NO!=newSalesInvoice.SI_NO).Sum(sm => (decimal?)sm.SI_TOTALVALUE) ?? 0;

    this.sI_COUNT =
      this.salesinvoiceDetails.filter((item) => item.sI_PROJECT === e.value)
        .length + 1;
    this.salesInvoiceNo =
      parseInt(
        this.salesinvoiceDetails[this.salesinvoiceDetails.length - 1].sI_NO
      ) + 1;
    this.formatinvoliceNo =
      new Date()
        .getFullYear()
        .toString()
        .substring(new Date().getFullYear().toString().length - 2) +
      "/" +
      e.value +
      "-" +
      this.sI_COUNT +
      "/" +
      this.salesInvoiceNo;
    if (
      this.projectResponses.filter((item) => item.projectID === e.value)
        .length > 0
    ) {
      this.totalProjectValue = this.projectResponses.filter(
        (item) => item.projectID === e.value
      )[0].orderValue;
    }

    this.totalPrevInvValue = this.salesinvoiceDetails
      .filter(
        (item) =>
          item.sI_PROJECT === e.value && item.sI_NO !== this.salesInvoiceNo
      )
      .reduce((sum, current) => sum + current.sI_TOTALVALUE, 0);
    this.totalPrevVATInvValue = this.salesinvoiceDetails
      .filter(
        (item) =>
          item.sI_PROJECT === e.value && item.sI_NO !== this.salesInvoiceNo
      )
      .reduce((sum, current) => sum + current.vatAmount, 0);

    this.totalCreditNoteValue = this.creditNotesDetails
      .filter((item) => item.cr_ProjectID === e.value)
      .reduce((sum, current) => sum + current.cr_Amount, 0);

    
   
    // console.log("Select Change",this.invoiceAddForm.get("sI_PROJECT").value);
    const filteredproejct = this.projectResponses.filter(
      (item) => item.projectID === this.invoiceAddForm.get("sI_PROJECT").value
    );
    // console.log(filteredproejct);
    this.invoiceAddForm.controls["sI_CONTACT"].setValue(
      filteredproejct[0].billingContact
    );
    this.invoiceAddForm.controls["sI_PAYMENTTERMS"].setValue(
      filteredproejct[0].paymentTerms
    );
    this.invoiceAddForm.controls["sI_CASHBANK"].setValue(
      filteredproejct[0].cashBank
    );
    this.invoiceAddForm.controls["sI_CUSTOMER"].setValue(
      filteredproejct[0].customer
    );
    this.invoiceAddForm.controls["sI_CURRENCY"].setValue(
      filteredproejct[0].currency
    );
    this.invoiceAddForm.controls["sI_BILLSCHEDULE"].setValue(
      filteredproejct[0].projectID
    );
    const filteredCustomer = this.customerResponses.filter(
      (item) => item.cusCode === filteredproejct[0].customer
    );
    this.taxCode = filteredCustomer[0].taxCode;
    this.currencyCode = filteredproejct[0].currency;
    // console.log("filteredCustomer", filteredCustomer[0].taxCode);
    //console.log("currency",filteredproejct[0].currency)
    this.billingCustomer();
    this.billingScheduleByProejct();
  }

  onCustomerChange(e: any) {
    const filteredcustomer = this.billingCustomerResponses.filter(
      (item) => item.projectID === this.invoiceAddForm.get("sI_PROJECT").value
    );
    //console.log(filteredcustomer[0].cmt.taxCode);
    this.itemAddForm.controls["vatPercent"].setValue(
      filteredcustomer[0].cmt.taxCode
    );
  }
  addItem() {
    this.resetAddInoviceItemFields();
    // console.log("this.taxCode", this.taxCode);
    let date = this.invoiceAddForm.get("sI_DATE").value;
    // console.log( "this.invoiceAddForm.get",date.getFullYear() +"-" +(Number(date.getMonth()) + 1) +"-" +date.getDate());
    //For VAT percentage for selected invoice date
    this.taxCodePercentage(
      this.taxCode,
      date.getFullYear() +
        "-" +
        (Number(date.getMonth()) + 1) +
        "-" +
        date.getDate()
    );
    //For Currecny Conversion Rate for selected invoice date and currecny code
    this.currencyRates(
      this.currencyCode,
      date.getFullYear() +
        "-" +
        (Number(date.getMonth()) + 1) +
        "-" +
        date.getDate()
    );
    this.getGlCode();
    this.addModal.nativeElement.click();
  }

  calcualateTotal() {
    let Total = 0;
    //  var checkedvalue = $("#chkVAtRequired").is(":checked");
    var checkedRequired = this.isChecked;
    //console.log("res",checkedRequired)

    if (this.itemAddForm.get("siD_RATEUOM").value.trim() === "%") {
      Total =
        (this.itemAddForm.get("siD_BILLQTY").value *
          this.itemAddForm.get("siD_IRATE").value *
          this.itemAddForm.get("siD_RATEPER").value) /
        100;
      //  console.log("Total",Total);
    } else {
      Total =
        this.itemAddForm.get("siD_BILLQTY").value *
        this.itemAddForm.get("siD_IRATE").value *
        this.itemAddForm.get("siD_RATEPER").value;
      // console.log("Else Total",Total);
    }
    let TotalVatAmount = Total;
    if (checkedRequired === true) {
      TotalVatAmount =
        (TotalVatAmount * this.itemAddForm.controls["vatPercent"].value) / 100;
      this.itemAddForm.controls["vatAmount"].setValue(TotalVatAmount);
      // console.log("TotalVatAmount", TotalVatAmount);
    } else {
      this.itemAddForm.controls["vatAmount"].setValue(0);
      this.itemAddForm.controls["vatPercent"].setValue(0);
    }
    this.itemAddForm.controls["siD_TOTAL"].setValue(Total.toFixed(2));
  }
  editInvoiceItem(addItem: InvoiceAddItem) {
    this.itemAddForm.setValue(addItem);
    this.addModal.nativeElement.click();
    //  this.toastr.success("Item Updated Sucessfully");
  }
  deleteInvoiceItem(id: number, siD_TOTAL: number) {
    this.invoiceItems = this.invoiceItems.filter((a) => a.siD_SNO !== id);
    let index: number = 1;
    this.invoiceItems.forEach((item: InvoiceAddItem) => {
      item.siD_SNO = index;
      index = index + 1;
    });
    this.dataSourceAddItem = new MatTableDataSource(this.invoiceItems);
    this.grand_total = (
      parseFloat(this.grand_total) - parseFloat(siD_TOTAL.toString())
    ).toFixed(2);
    this.toastr.success("Deleted sucessfully");
  }
  //
  onADD() {
    let invoiceItem: InvoiceAddItem = this.itemAddForm.value;
    if (invoiceItem.siD_SNO > 0) {
      this.grand_total = (
        parseFloat(this.grand_total) -
        parseFloat(
          this.invoiceItems.find((a) => a.siD_SNO === invoiceItem.siD_SNO)
            .siD_TOTAL
        )
      ).toFixed(2);
      this.invoiceItems = this.invoiceItems.filter(
        (a) => a.siD_SNO !== invoiceItem.siD_SNO
      );
    } else {
      invoiceItem.siD_SNO = this.invoiceItems.length + 1;
    }

    this.grand_total = (
      parseFloat(this.grand_total) + parseFloat(invoiceItem.siD_TOTAL)
    ).toFixed(2);
    // let body: any;
    this.invoiceItems.push(invoiceItem);
    this.invoiceItems.sort((a, b) => (a.siD_SNO > b.siD_SNO ? 1 : -1));
    this.dataSourceAddItem = new MatTableDataSource(this.invoiceItems);
    this.resetAddInoviceItemFields();
    this.toastr.success("Item Added Sucessfully");
  }
  // reset the textboxes value in model popup
  resetAddInoviceItemFields() {
    this.itemAddForm.controls["siD_ITEMDESC"].setValue("");
    this.itemAddForm.controls["siD_ITEMDESC_Arabic"].setValue("");
    this.itemAddForm.controls["siD_BILLQTY"].setValue("");
    this.itemAddForm.controls["siD_BILLWEIGHT"].setValue("");
    this.itemAddForm.controls["siD_IRATE"].setValue("");
    this.itemAddForm.controls["siD_RATEPER"].setValue("");
    this.itemAddForm.controls["siD_SNO"].setValue("");
  }
  ItemAddColumns: string[] = [
    "siD_SNO",
    "sID_GLCODE",
    "siD_ITEMDESC",
    "siD_ITEMDESC_Arabic",
    "siD_BILLQTY",
    "siD_BILLWEIGHT",
    "siD_IRATE",
    "siD_RATEPER",
    "siD_RATEUOM",
    "siD_TOTAL",
    "vatAmount",
    "vatPercent",
    "Update",
    "Delete",
  ];

  //Save data sales invoce and sales invoice item

  SaveInvoice() {
    const totalItemInvoiceValue: number = this.invoiceItems.reduce(
      (sum, current) => sum + parseFloat(current.siD_TOTAL),
      0
    );

    this.totalActualInvoiceValue =
    this.totalPrevInvValue +
    this.totalItemInvoiceValue -
    (this.totalCreditNoteValue + this.totalPrevVATInvValue);
    if (this.totalProjectValue < this.totalActualInvoiceValue)
    {
      this.toastr.error('Please check amount. Invoice value is more then project value.');
      return;
    }
   // const totalProjectValue = (decimal)db.ProjectMasters.Where(wh => wh.ProjectID == newSalesInvoice.SI_PROJECT).FirstOrDefault().OrderValue;
     
      const totlVAtValue: number = this.invoiceItems.reduce(
        (sum, current) => sum + current.vatAmount,
        0
      );
      const totalValueLcyHeader: number =
        totalItemInvoiceValue * this.currencyRatesResponses;
      const totlVAtValueLCY: number = totlVAtValue * this.currencyRatesResponses;
      //Save data sales invoice table
      let addInvoiceData: AddInvoice = {
        SI_NO: "0",
        sI_INVOICENO: this.formatinvoliceNo,
        sI_PAIDAMT: 0,
        acknowledgeInvDate: new Date(),
        sI_PAIDAMTLCY: 0,
        branchID: 1,
        sI_PAYMENTTERMS: this.invoiceAddForm.controls["sI_PAYMENTTERMS"].value,
        compID: 1,
        sI_PAYMETHOD: this.invoiceAddForm.controls["sI_PAYMETHOD"].value,
        isAdvance:
          this.invoiceAddForm.controls["isAdvance"].value === true ? "Y" : "N",
        sI_PROJECT: this.invoiceAddForm.controls["sI_PROJECT"].value,
        sI_BILLTOCOMPANY: this.invoiceAddForm.controls["sI_CUSTOMER"].value
          .toString()
          .trim(),
        sI_SENTBY: null,
        sI_SENTDATE: null,
        sI_CASHBANK: this.invoiceAddForm.controls["sI_CASHBANK"].value,
        sI_SYSDATE: new Date(),
        sI_Status: "A",
        sI_CNOTE: "N",
        sI_TOTALVALUE: totalItemInvoiceValue + totlVAtValue,
        sI_CONTACT: this.invoiceAddForm.controls["sI_CONTACT"].value
          .toString()
          .trim(),
        sI_TOTALVALUELCY: totlVAtValueLCY + totalValueLcyHeader,
        sI_USERID: parseInt(localStorage.getItem("empID")),
        sI_CONVRATE: this.currencyRatesResponses,
        taxCode: this.taxCode,
        vatAmount: totlVAtValue,
        vatAmountLCY: totlVAtValueLCY,
        sI_COUNT: this.sI_COUNT,
        vatPercentage: this.itemAddForm.controls["vatPercent"].value,
        expectedRcptDate: null,
        sI_CURRENCY: this.invoiceAddForm.controls["sI_CURRENCY"].value,
        lastModifiedBy: null,
        lastModifiedDate: null,
        sI_CUSTOMER: this.invoiceAddForm.controls["sI_CUSTOMER"].value
          .toString()
          .trim(),
        remarks: null,
        sI_BCURRENCY: null,
        sI_BILLSCHEDULE: this.invoiceAddForm.controls["sI_BILLSCHEDULE"].value,
        sI_BVALUE: null,
        sI_DATE: this.invoiceAddForm.controls["sI_DATE"].value,
        sI_RETENSION: null,
        totalInvBalToBePaid: null,
      };
      //Save data sales invoice item table
      this.salesEstimationService
        .saveInvoice(addInvoiceData)
        .subscribe((siD_NO: number) => {
          this.invoiceItems.forEach((item: InvoiceAddItem) => {
            item.siD_NO = siD_NO;
            item.siD_SNO = 0;
            item.siD_PROJECT = addInvoiceData.sI_PROJECT;
            item.siD_TAGID = null;
            item.siD_CURRENCY = addInvoiceData.sI_CURRENCY;
            item.siD_TOTALLCY =
              parseFloat(item.siD_TOTAL) * this.currencyRatesResponses;
            item.siD_STATUS = "A";
            item.vatAmountLCY = item.vatAmount * this.currencyRatesResponses;
            item.createdBy = localStorage.getItem("empID");
            item.creationDate = new Date();
            item.lastModifiedBy = null;
            item.lastModifiedDate = null;
          });
          //console.log("vat vaule" , this.itemAddForm.controls["vatAmount"].value);
          // console.log("Total vaule" , this.itemAddForm.controls["siD_TOTAL"].value);
          // console.log(this.invoiceItems);
          this.salesEstimationService
            .saveInvoiceItem(this.invoiceItems)
            .subscribe((res: number) => {
              this.toastr.success("Invoice inserted sucessfully");
              this.router.navigateByUrl("/home/sales-invoice-list");
            });
        });
  }
  // Project Drop-Down list serach
  // customSearchFn(term: string, item: any) {
  //   term = term.toLowerCase();
  //   let splitTerm = term.split(" ").filter((t) => t);
  //   let isWordThere = [];
  //   splitTerm.forEach((arr_term) => {
  //     let search =
  //       item.projectID.toString().toLowerCase() +
  //       " " +
  //       item.projectDesc.toLowerCase();
  //     isWordThere.push(search.indexOf(arr_term) != -1);
  //   });
  //   const all_words = (this_word) => this_word;
  //   return isWordThere.every(all_words);
  // }
  // getTotal() {
  //   return this.ItemAddColumns.map(t=>t.ItemAddColums.siD_TOTAL).reduce((acc, value) => acc + value, 0);
  // }
  // dataSource = ELEMENT_DATA;
  // ngOnInit(): void {
  // }
}
