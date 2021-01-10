import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { CommonService } from '../../../services/common.service';
import { SalesEstimationService } from '../../../services/sales-estimation.service'
import { TableUtil } from "../../../shared/tableUtil";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { from } from "rxjs";
// import {MatProgressBarModule} from '@angular/material/progress-bar';
@Component({
  selector: "app-customer-master",
  templateUrl: "./customer-master.component.html",
  styleUrls: ["./customer-master.component.css"],
})
export class CustomerMasterComponent {
  @ViewChild("addModal", { static: false }) addModal: ElementRef;
  @ViewChild("closeModal", { static: false }) closeModal: ElementRef;
  @ViewChild("updateModal", { static: false }) updateModal: ElementRef;
  @ViewChild("closeaddModal", { static: false }) closeaddModal: ElementRef;

  displayedColumns: string[] = [
    "id",
    "cusCode",
    "cusName",
    "address1",
    "HomePage",
    "phone",
    "email",
    "Country",
    "Currency",
    "CreatedBy",
    "CreatedDate",
    "Update",
    "Delete",
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  updateuserid: any;
  updateForm: FormGroup;
  cusAddForm: FormGroup;
  customermasterDetails = [];
  clicked = false;
  countryResponses: any;
  currencyResponses: any;
  contactResponses: any;
  payTermsResponses: any;
  customerPostingGlAcctResponses: any;
  taxCodeResponses: any;
  constructor(
    private commonService: CommonService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private salesEstimationService :SalesEstimationService
  ) {
    this.cusAddForm = new FormGroup({
      cusCode: new FormControl("", [Validators.required]),
      cusName: new FormControl("", [Validators.required]),
      address1: new FormControl("", [Validators.required]),
      phone: new FormControl(""),
      email: new FormControl(""),
      homePage: new FormControl(""),
      country: new FormControl("", [Validators.required]),
      currency: new FormControl("", [Validators.required]),
      taxCode: new FormControl("", [Validators.required]),
      fax: new FormControl(""),
      category: new FormControl(""),
      //  contact: new FormControl("", [Validators.required]),
      status: new FormControl("", [Validators.required]),
      payTerms: new FormControl("", [Validators.required]),
      vendorID: new FormControl(""),
      customerPostingGlAcct: new FormControl("", [Validators.required]),
      vatPostingGlAcct: new FormControl(""),
      vaTid: new FormControl(""),
      cusName_Arabic: new FormControl(""),
      address1_Arabic: new FormControl(""),
    });
    this.updateForm = new FormGroup({
      cusName: new FormControl("", [Validators.required]),
      address1: new FormControl("", [Validators.required]),
      phone: new FormControl(""),
      email: new FormControl(""),
      homePage: new FormControl(""),
      country: new FormControl("", [Validators.required]),
      currency: new FormControl("", [Validators.required]),
      taxCode: new FormControl("", [Validators.required]),
      fax: new FormControl(""),
      category: new FormControl(""),
      //  contact: new FormControl("",[Validators.required]),
      status: new FormControl("", [Validators.required]),
      payTerms: new FormControl("", [Validators.required]),
      vendorID: new FormControl(""),
      customerPostingGlAcct: new FormControl("", [Validators.required]),
      vatPostingGlAcct: new FormControl(""),
      vaTid: new FormControl(""),
      cusName_Arabic: new FormControl(""),
      address1_Arabic: new FormControl(""),
    });
    this.countryMaster();
    this.currencyMaster();
    // this.contactMaster();
    this.cusmaster();
    this.payMaster();
    this.customerPostingGlAcctMaster();
    this.taxCodeMaster();
  }
  countryMaster() {
    this.commonService.countryMaster().subscribe((res: any) => {
      if (res !== null) {
        this.countryResponses = res;
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
  contactMaster() {
    this.salesEstimationService.contactMaster().subscribe((res: any) => {
      if (res !== null) {
        this.contactResponses = res;
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
  customerPostingGlAcctMaster() {
    this.salesEstimationService.customerPostingGlAcctMaster().subscribe((res: any) => {
      if (res !== null) {
        this.customerPostingGlAcctResponses = res;
      }
    });
  }
  taxCodeMaster() {
    this.commonService.taxCodeMaster().subscribe((res: any) => {
      if (res !== null) {
        this.taxCodeResponses = res;
      }
    });
  }

  onCountryChange(e: any) {
    //console.log(e.target.value);
    const filteredcountry = this.countryResponses.filter(
      (item) => item.countryCode === e.target.value
    );
    //console.log(filteredcountry);
    this.updateForm.controls["currency"].setValue(filteredcountry[0].currency);
    this.cusAddForm.controls["currency"].setValue(filteredcountry[0].currency);
  }
  cusmaster() {
    this.spinner.show();
    this.salesEstimationService.customerMaster().subscribe((res: any) => {
      this.spinner.hide();
      if (res !== null) {
        this.customermasterDetails = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        // console.log(res);
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
    TableUtil.exportToExcel("CustomerTable");
  }
  deleteCustomer(id: any) {
    this.salesEstimationService.customerMasterdeletefun(id).subscribe((res: any) => {
      this.toastr.success("Deleted sucessfully");
      this.cusmaster();
    });
  }
  addCustomer() {
    this.addModal.nativeElement.click();
  }
  onADD() {
    let body: any;
    body = {
      id: 0,
      cusCode: this.cusAddForm.get("cusCode").value,
      cusName: this.cusAddForm.get("cusName").value,
      address1: this.cusAddForm.get("address1").value,
      phone: this.cusAddForm.get("phone").value,
      email: this.cusAddForm.get("email").value,
      homePage: this.cusAddForm.get("homePage").value,
      country: this.cusAddForm.get("country").value,
      currency: this.cusAddForm.get("currency").value,
      taxCode: this.cusAddForm.get("taxCode").value,
      fax: this.cusAddForm.get("fax").value,
      category: this.cusAddForm.get("category").value,
      // contact: this.cusAddForm.get("contact").value,
      status: this.cusAddForm.get("status").value === true ? "Y" : "N",
      payTerms: this.cusAddForm.get("payTerms").value,
      vendorID: this.cusAddForm.get("vendorID").value,
      customerPostingGlAcct: +this.cusAddForm.get("customerPostingGlAcct")
        .value,
      vatPostingGlAcct: +this.cusAddForm.get("vatPostingGlAcct").value,
      vaTid: this.cusAddForm.get("vaTid").value,
      cusName_Arabic: this.cusAddForm.get("cusName_Arabic").value,
      address1_Arabic: this.cusAddForm.get("address1_Arabic").value,
    };
    this.salesEstimationService.customerMasterUpdate(body).subscribe((res: any) => {
      //console.log(res);
      this.cusmaster();
      this.toastr.success("Added Sucessfully");
      this.cusAddForm.reset();
      this.cusAddForm.controls["country"].setValue("");
      this.closeaddModal.nativeElement.click();
    });
  }

  onUpdate() {
    let body: any;
    body = {
      id: this.updateuserid[0].id,
      cusCode: this.updateuserid[0].cusCode.trim(),
      cusName: this.updateForm.get("cusName").value,
      address1: this.updateForm.get("address1").value,
      phone: this.updateForm.get("phone").value,
      email: this.updateForm.get("email").value,
      homePage: this.updateForm.get("homePage").value,
      country: this.updateForm.get("country").value,
      currency: this.updateForm.get("currency").value,
      taxCode: this.updateForm.get("taxCode").value,
      fax: this.updateForm.get("fax").value,
      category: this.updateForm.get("category").value,
      //  contact: this.updateForm.get("contact").value,
      status: this.updateForm.get("status").value === true ? "Y" : "N",
      payTerms: this.updateForm.get("payTerms").value,
      vendorID: this.updateForm.get("vendorID").value,
      customerPostingGlAcct: +this.updateForm.get("customerPostingGlAcct")
        .value,
      vatPostingGlAcct: +this.updateForm.get("vatPostingGlAcct").value,
      vaTid: this.updateForm.get("vaTid").value,
      cusName_Arabic: this.updateForm.get("cusName_Arabic").value,
      address1_Arabic: this.updateForm.get("address1_Arabic").value,
    };
    this.salesEstimationService.customerMasterUpdate(body).subscribe((res: any) => {
      //console.log(res);
      this.cusmaster();
      this.toastr.success("Updated Sucessfully");
      this.closeModal.nativeElement.click();
    });
  }

  editCustomer(id: any) {
    this.updateuserid = [];
    this.updateuserid = this.customermasterDetails.filter(
      (item) => item.id === id
    );
    //console.log(this.updateuserid);
    this.updateModal.nativeElement.click();
    this.updateForm.controls["cusName"].setValue(this.updateuserid[0].cusName);
    this.updateForm.controls["address1"].setValue(
      this.updateuserid[0].address1
    );
    this.updateForm.controls["phone"].setValue(this.updateuserid[0].phone);
    this.updateForm.controls["email"].setValue(this.updateuserid[0].email);
    this.updateForm.controls["homePage"].setValue(
      this.updateuserid[0].homePage
    );
    this.updateForm.controls["country"].setValue(this.updateuserid[0].country);
    this.updateForm.controls["currency"].setValue(
      this.updateuserid[0].currency
    );
    this.updateForm.controls["taxCode"].setValue(this.updateuserid[0].taxCode);
    this.updateForm.controls["fax"].setValue(this.updateuserid[0].fax);
    this.updateForm.controls["category"].setValue(
      this.updateuserid[0].category
    );
    //  this.updateForm.controls["contact"].setValue(this.updateuserid[0].contact);
    this.updateForm.controls["status"].setValue(
      this.updateuserid[0].status === "Y" ? true : false
    );
    this.updateForm.controls["payTerms"].setValue(
      this.updateuserid[0].payTerms
    );
    this.updateForm.controls["vendorID"].setValue(
      this.updateuserid[0].vendorID
    );
    this.updateForm.controls["customerPostingGlAcct"].setValue(
      this.updateuserid[0].customerPostingGlAcct
    );
    this.updateForm.controls["vatPostingGlAcct"].setValue(
      this.updateuserid[0].vatPostingGlAcct
    );
    this.updateForm.controls["vaTid"].setValue(this.updateuserid[0].vaTid);
    this.updateForm.controls["cusName_Arabic"].setValue(
      this.updateuserid[0].cusName_Arabic
    );
    this.updateForm.controls["address1_Arabic"].setValue(
      this.updateuserid[0].address1_Arabic
    );
  }
}
