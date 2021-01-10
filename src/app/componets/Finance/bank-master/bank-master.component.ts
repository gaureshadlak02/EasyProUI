import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
//import { UserService } from 'app/services/user.service';
import { FinanceService } from '../../../services/finance.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableUtil } from 'app/shared/tableUtil';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AutofillMonitor} from '@angular/cdk/text-field';
import { from } from 'rxjs';

@Component({
  selector: 'app-bank-master',
  templateUrl: './bank-master.component.html',
  styleUrls: ['./bank-master.component.css']
})


export class BankMasterComponent  {
 @ViewChild("addModal", { static: false }) addModal: ElementRef;
 @ViewChild("closeaddModal", { static: false }) closeaddModal: ElementRef;
 @ViewChild("closeModal", { static: false }) closeModal: ElementRef;
 @ViewChild("updateModal", { static: false }) updateModal: ElementRef;
 @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
 @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = [
    "id",
    "cB_CODE",
    "cB_GLCODE",
    "cB_BANKNAME",
    "bankNameArabic",
    "cB_ACCOUNTNO",
    "cB_ADDRESS1",
    "bankAddressArabic",
    "cB_TELEPHONE",
    "CreatedBy",
    "CreatedDate",
    "Update",
    "Delete",
  ];
  dataSource: MatTableDataSource<any>;
  bankmasterDetails = [];
  updateuserid: any;
  bankAddForm: FormGroup;
  updateForm: FormGroup;
  glCodeResponses: any;
  constructor(private financeService: FinanceService, private toastr: ToastrService) 
  {
    this.bankAddForm = new FormGroup({
      cB_CODE: new FormControl("", [Validators.required]),
      cB_GLCODE: new FormControl("", [Validators.required]),
      cB_BANKNAME: new FormControl("", [Validators.required]),
      bankNameArabic: new FormControl(""),
      cB_ACCOUNTNO: new FormControl("", [Validators.required]),
      cB_SWIFT: new FormControl("", [Validators.required]),
      cB_IBAN: new FormControl("", [Validators.required]),
      cB_YEAR: new FormControl("", [Validators.required]),
      cB_MONTH: new FormControl("", [Validators.required]),
      cB_OPBAL: new FormControl("", [Validators.required]),
      cB_ADDRESS1: new FormControl("", [Validators.required]),
      bankAddressArabic: new FormControl(""),
      cB_TELEPHONE: new FormControl(""),
      cB_FAX: new FormControl(""),
      postFlg: new FormControl(false),
    });
    this.updateForm = new FormGroup({
      cB_CODE: new FormControl("", [Validators.required]),
      cB_GLCODE: new FormControl("", [Validators.required]),
      cB_BANKNAME: new FormControl("", [Validators.required]),
      bankNameArabic: new FormControl(""),
      cB_ACCOUNTNO: new FormControl("", [Validators.required]),
      cB_SWIFT: new FormControl("", [Validators.required]),
      cB_IBAN: new FormControl("", [Validators.required]),
      cB_YEAR: new FormControl("", [Validators.required]),
      cB_MONTH: new FormControl("", [Validators.required]),
      cB_OPBAL: new FormControl("", [Validators.required]),
      cB_ADDRESS1: new FormControl("", [Validators.required]),
      bankAddressArabic: new FormControl(""),
      cB_TELEPHONE: new FormControl(""),
      cB_FAX: new FormControl(""),
      postFlg: new FormControl(""),
    });
    this.bankMaster();
    this.glCodeMaster();
  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.bankAddForm.controls[controlName].hasError(errorName);
  }
  bankMaster() {
    this.financeService.bankMaster().subscribe((res: any) => {
      if (res !== null) {



        this.bankmasterDetails = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
  glCodeMaster() {
    this.financeService.glCodeMaster().subscribe((res: any) => {
      if(res !== null) {
        //console.log("res",res);
        this.glCodeResponses=res;
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
    TableUtil.exportToExcel("BankTable");
  }
  deleteBank(id: any) {
    this.financeService.bankMasterdeletefun(id).subscribe((res: any) => {
      this.toastr.success("Deleted sucessfully");
      this.bankMaster();
    });
  }
  addBank() {
    this.addModal.nativeElement.click();
  }

  onADD() {
    let body: any;
    body = {
      id: 0,
      cB_CODE: this.bankAddForm.get("cB_CODE").value ,
      cB_GLCODE: this.bankAddForm.get("cB_GLCODE").value,
      cB_BANKNAME: this.bankAddForm.get("cB_BANKNAME").value,
      bankNameArabic: this.bankAddForm.get("bankNameArabic").value,
      cB_ACCOUNTNO: this.bankAddForm.get("cB_ACCOUNTNO").value,
      cB_SWIFT: this.bankAddForm.get("cB_SWIFT").value,
      cB_IBAN: this.bankAddForm.get("cB_IBAN").value,
      cB_YEAR: this.bankAddForm.get("cB_YEAR").value,
      cB_MONTH: this.bankAddForm.get("cB_MONTH").value,
      cB_OPBAL: this.bankAddForm.get("cB_OPBAL").value,
      cB_ADDRESS1: this.bankAddForm.get("cB_ADDRESS1").value,
      bankAddressArabic: this.bankAddForm.get("bankAddressArabic").value,
      cB_TELEPHONE: this.bankAddForm.get("cB_TELEPHONE").value,
      cB_FAX: this.bankAddForm.get("cB_FAX").value,
      postFlg: this.bankAddForm.get("postFlg").value,
    };
    console.log(body)
    this.financeService.bankMasterUpdate(body).subscribe((res: any) => {
      console.log(res);
      this.bankMaster();
      this.toastr.success("Added Sucessfully");
      this.bankAddForm.reset();
    //  this.bankAddForm.controls["country"].setValue('');
      this.closeaddModal.nativeElement.click();
    });
  }
  onUpdate() {
    let body: any;
    body = {
      id: this.updateuserid[0].id,
      cB_CODE: this.updateForm.get("cB_CODE").value ,
      cB_GLCODE: this.updateForm.get("cB_GLCODE").value,
      cB_BANKNAME: this.updateForm.get("cB_BANKNAME").value,
      bankNameArabic: this.updateForm.get("bankNameArabic").value,
      cB_ACCOUNTNO: this.updateForm.get("cB_ACCOUNTNO").value,
      cB_SWIFT: this.updateForm.get("cB_SWIFT").value,
      cB_IBAN: this.updateForm.get("cB_IBAN").value,
      cB_YEAR: this.updateForm.get("cB_YEAR").value,
      cB_MONTH: this.updateForm.get("cB_MONTH").value,
      cB_OPBAL: this.updateForm.get("cB_OPBAL").value,
      cB_ADDRESS1: this.updateForm.get("cB_ADDRESS1").value,
      bankAddressArabic: this.updateForm.get("bankAddressArabic").value,
      cB_TELEPHONE: this.updateForm.get("cB_TELEPHONE").value,
      cB_FAX: this.updateForm.get("cB_FAX").value,
      postFlg: this.updateForm.get("postFlg").value,
    };
    this.financeService.bankMasterUpdate(body).subscribe((res: any) => {
      //console.log(res);
      this.bankMaster();
      this.toastr.success("Updated Sucessfully");
      this.closeModal.nativeElement.click();
    });
  }
  editCustomer(id: any) {
    this.updateuserid = [];
    this.updateuserid = this.bankmasterDetails.filter(
      (item) => item.id === id
    );
    //console.log(this.updateuserid);
    this.updateModal.nativeElement.click();
    this.updateForm.controls["cB_CODE"].setValue(this.updateuserid[0].cB_CODE);
    this.updateForm.controls["cB_GLCODE"].setValue(this.updateuserid[0].cB_GLCODE);
    this.updateForm.controls["cB_BANKNAME"].setValue(this.updateuserid[0].cB_BANKNAME);
    this.updateForm.controls["bankNameArabic"].setValue(this.updateuserid[0].bankNameArabic);
    this.updateForm.controls["cB_ACCOUNTNO"].setValue(this.updateuserid[0].cB_ACCOUNTNO);
    this.updateForm.controls["cB_SWIFT"].setValue(this.updateuserid[0].cB_SWIFT);
    this.updateForm.controls["cB_IBAN"].setValue(this.updateuserid[0].cB_IBAN);
    this.updateForm.controls["cB_YEAR"].setValue(this.updateuserid[0].cB_YEAR);
    this.updateForm.controls["cB_MONTH"].setValue(this.updateuserid[0].cB_MONTH);
    this.updateForm.controls["cB_OPBAL"].setValue(this.updateuserid[0].cB_OPBAL);
    this.updateForm.controls["cB_ADDRESS1"].setValue(this.updateuserid[0].cB_ADDRESS1);
    this.updateForm.controls["bankAddressArabic"].setValue(this.updateuserid[0].bankAddressArabic);
    this.updateForm.controls["cB_TELEPHONE"].setValue(this.updateuserid[0].cB_TELEPHONE);
    this.updateForm.controls["cB_FAX"].setValue(this.updateuserid[0].cB_FAX);
    this.updateForm.controls["postFlg"].setValue(this.updateuserid[0].postFlg);
   
  }

}
