import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
// import { AuthService } from "app/services/auth.service";
import { ToastrService } from "ngx-toastr";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ItAdminService } from '../../../services/it-admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableUtil } from 'app/shared/tableUtil';


@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  @ViewChild("updateModal", { static: false }) updateModal: ElementRef;
  @ViewChild("closeModal", { static: false }) closeModal: ElementRef;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = [
    "Id",
    "empId",
    "emailId",
    "userName",
    "password",
    "userType",
    "isActive",
    "createdBy",
    "createdDate",
    "Update",
    "Delete",
  ];
  dataSource: MatTableDataSource<any>;
  UserDetails= [];
  updateForm: FormGroup;
  isTextFieldType: boolean;
  updateuserid = [];
  getuserId: any;
  userType = [
    {'id':1,'description':'Admin'},
    {'id':2,'description':'Internal Users'},
    {'id':3,'description':'External Users'},
    {'id':4,'description':'Suppliers'},
    {'id':5,'description':'Customers'}
  ]
  
  constructor(
    private itAdminService: ItAdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.updateForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      empId: new FormControl("", [Validators.required]),
      userName: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      isActive: new FormControl("", [Validators.required]),
      userTypeId: new FormControl("", [Validators.required])
    });
    this.getUsers();
  }
  getUsers() {
    this.itAdminService.getUsers().subscribe((res: any) => {
      if (res) {
       this.UserDetails = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
  updateUser(id: any) {
    this.getuserId = id;
    this.updateuserid = [];
    this.updateuserid = this.UserDetails.filter((item) => item.id === id);
    this.updateModal.nativeElement.click();
    this.updateForm.controls["email"].setValue(this.updateuserid[0].emailId);
    this.updateForm.controls["empId"].setValue(this.updateuserid[0].empId);
    this.updateForm.controls["userName"].setValue(this.updateuserid[0].userName);
    this.updateForm.controls["password"].setValue(this.updateuserid[0].password);
    this.updateForm.controls["isActive"].setValue(this.updateuserid[0].isActive );
    this.updateForm.controls["userTypeId"].setValue(this.updateuserid[0].userType.id);
   
  }
  onUpdate() {
    let updateBody: any;
    updateBody = {
      id: +this.getuserId,
      emailId: this.updateForm.get("email").value,
      password: this.updateForm.get("password").value,
      userName: this.updateForm.get("userName").value,
      empId: +this.updateForm.get("empId").value,
      isActive: this.updateForm.get("isActive").value,
      userTypeId: +this.updateForm.get("userTypeId").value,
      CreatedBy:Number(localStorage.getItem("empID")),
      lastModifiedBy: Number(localStorage.getItem("empID")),
    };
    this.itAdminService.updatecurrentUser(updateBody).subscribe((res: any) => {
      if (res === null) {
        this.getUsers();
        this.toastr.success("Updated Sucessfully");
        this.closeModal.nativeElement.click();
      }
    });
  }
  togglePasswordFieldType() {
    this.isTextFieldType = !this.isTextFieldType;
  }
  PasswordFieldType(){
    this.isTextFieldType = false;
  }

  deleteUser(id: any) {
    this.itAdminService.deleteUser(id).subscribe((res: any) => {
          this.toastr.success("Deleted Sucessfully");
          this.getUsers();
    });
  }
  ngAfterViewInit() {}
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  exportTable() {
    TableUtil.exportToExcel("UserTable");
  }
}

  



