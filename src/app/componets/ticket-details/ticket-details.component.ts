import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { TicketService } from "app/services/ticket.service";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TableUtil } from "app/shared/tableUtil";
import { ConnectedPositionStrategy } from "@angular/cdk/overlay";
import { baseUrl } from "app/services/url-provider";

@Component({
  selector: "app-ticket-details",
  templateUrl: "./ticket-details.component.html",
  styleUrls: ["./ticket-details.component.css"],
})
export class TicketDetailsComponent {
  departmentMaster() {
    this.ticketService.departmentMaster().subscribe((res: any) => {
      if (res !== null) {
        this.departmentResponses = res;
      }
    });
  }
  categoryMaster() {
    this.ticketService.categoryMaster().subscribe((res: any) => {
      if (res !== null) {
        this.categoryResponses = res;
      }
    });
  }
  priorityMaster() {
    this.ticketService.priorityMaster().subscribe((res: any) => {
      if (res !== null) {
        this.priorityResponses = res;
      }
    });
  }
  statusMaster() {
    this.ticketService.statusMaster().subscribe((res: any) => {
      if (res !== null) {
        this.statusResponses = res;
      }
    });
  }
  employeeMaster() {
    this.ticketService.employeeMaster().subscribe((res: any) => {
      if (res !== null) {
        this.EmployeeResponses = res.filter((obj) => obj.active === "Y");
        //console.log("employee",this.EmployeeResponses );
      }
    });
  }
  sourceMaster() {
    this.ticketService.sourceMaster().subscribe((res: any) => {
      if (res !== null) {
        this.sourceResponses = res;
      }
    });
  }

  displayedColumns: string[] = [
    "ticketId",
    // "requestId",
    "subject",
    "status",
    "priority",
    "department",
    "assignTo",
    "category",
    "createdBy",
    "createdDate",
    "Update",
    "Delete",
  ];
  @ViewChild("addModal", { static: false }) addModal: ElementRef;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("updateModal", { static: false }) updateModal: ElementRef;
  @ViewChild("closeModal", { static: false }) closeModal: ElementRef;

  dataSource: MatTableDataSource<any>;

  updateForm: any;
  NewTicketForm: FormGroup;
  sourceResponses: any;
  EmployeeResponses: any;
  statusResponses: any;
  priorityResponses: any;
  categoryResponses: any;
  departmentResponses: any;
  employee: any;
  updateticketid: any = [];
  ticketmasterDetails: any;
  baseUrl: any;
  constructor(
    private ticketService: TicketService,
    private toastr: ToastrService
  ) {
    this.NewTicketForm = new FormGroup({
      subject: new FormControl("", [Validators.required]),
      source: new FormControl(""),
      empId: new FormControl(localStorage.getItem("empID")),
      status: new FormControl(""),
      priority: new FormControl("", [Validators.required]),
      department: new FormControl("", [Validators.required]),
      assignTo: new FormControl("", [Validators.required]),
      description: new FormControl(""),
      category: new FormControl(""),
      image: new FormControl(""),
    });

    this.updateForm = new FormGroup({
      requestId: new FormControl(""),
      subject: new FormControl(""),
      status: new FormControl("", [Validators.required]),
      priority: new FormControl(""),
      // department: new FormControl("", [Validators.required]),
      assignTo: new FormControl(""),
      empId: new FormControl(""),
      description: new FormControl(""),
      category: new FormControl(""),
      remark: new FormControl("", [Validators.required]),
      filterstatus: new FormControl(""),
    });
    this.sourceMaster();
    this.statusMaster();
    this.priorityMaster();
    this.categoryMaster();
    this.departmentMaster();
    this.employeeMaster();
    this.ticketmaster();
  }

  addTicket() {
    this.addModal.nativeElement.click();
  }

  ticketmaster() {
    let empId = localStorage.getItem("empID");
    this.ticketService.ticketDetails(empId).subscribe((res: any) => {
      if (res !== null) {
        this.ticketmasterDetails = res;
        let filter = this.ticketmasterDetails.filter(
          (obj) => obj.status === Number(1) && obj.assignTo === Number(empId)
        );
        filter = filter.sort((x, y) => x.ticketId > y.ticketId ? -1 : 1);
        this.dataSource = new MatTableDataSource(filter);
        //this.dataSource = new MatTableDataSource(res);
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
  deleteTicket(ticketId: any) {
    this.ticketService.ticketMasterdelete(ticketId).subscribe((res: any) => {
      this.toastr.success("Deleted sucessfully");
      this.ticketmaster();
    });
  }

  exportTable() {
    TableUtil.exportToExcel("TicketTable");
  }
  // ngOnInit(): void {}
  filterData() {
    if (Number(this.updateForm.get("filterstatus").value) > 0) {
      let filter = this.ticketmasterDetails.filter(
        (obj) =>
          obj.status === Number(this.updateForm.get("filterstatus").value)
      );
      filter = filter.sort((x, y) => x.ticketId > y.ticketId ? -1 : 1);
      this.dataSource = new MatTableDataSource(filter);
    } else {
      const filter = this.ticketmasterDetails.sort((x, y) => x.ticketId > y.ticketId ? -1 : 1);
      this.dataSource = new MatTableDataSource(filter);
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  RadiofilterData(data) {
    let empId = localStorage.getItem("empID");
    if (data.value === "1") {
      let filter = this.ticketmasterDetails.filter(
        (obj) => obj.status === Number(1) && obj.assignTo === Number(empId)
      );
      this.dataSource = new MatTableDataSource(filter);
    } else if (data.value === "2") {
      let filter = this.ticketmasterDetails.filter(
        (obj) => obj.assignTo === Number(empId)
      );
      this.dataSource = new MatTableDataSource(filter);
    }
    //this.dataSource = new MatTableDataSource(res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  onSubmit() {
    let body: any;
    let employee = this.EmployeeResponses.filter(
      (obj) => obj.empID === Number(this.NewTicketForm.get("assignTo").value)
    );
    let employeeName = this.EmployeeResponses.filter(
      (obj) => obj.empID === Number(this.NewTicketForm.get("assignTo").value)
    );
    let employeeEmp = this.EmployeeResponses.filter(
      (obj) => obj.empID === Number(this.NewTicketForm.get("empId").value)
    );
    let employeeCreated = this.EmployeeResponses.filter(
      (obj) => obj.empID === Number(this.NewTicketForm.get("empId").value)
    );
    let employeeCreatedDeparment = this.EmployeeResponses.filter(
      (obj) => obj.empID === Number(this.NewTicketForm.get("empId").value)
    );
    // console.log("employeeCreated",employeeCreated);
    body = {
      ticketId: 0,
      subject: this.NewTicketForm.get("subject").value,
      source: Number(this.NewTicketForm.get("source").value),
      // Ass:{EMailID: employee.eMailID},
      // empEmail:{EMailID:employeeEmp.eMailID},
      empId: Number(this.NewTicketForm.get("empId").value),
      status: 1,
      priority: Number(this.NewTicketForm.get("priority").value),
      department: this.NewTicketForm.get("department").value,
      description: this.NewTicketForm.get("description").value,
      assignTo: Number(this.NewTicketForm.get("assignTo").value),
      category: Number(this.NewTicketForm.get("category").value),
      createdBy: Number(localStorage.getItem("empID")),
    };
    this.ticketService.AddNewTicket(body).subscribe((res: any) => {
      //console.log(res);
      if (this.files) {
        this.upload(res);
      }
      let EmailBody={
        ticketId:res,
        subject: this.NewTicketForm.get("subject").value,
        department: this.NewTicketForm.get("department").value,
        description: this.NewTicketForm.get("description").value,
        assignTo: employeeName[0].empName,
        createdBy:employeeCreated[0].empName,
        assignEmail:employee[0].eMailID,
        createdByEmail:employeeEmp[0].eMailID,
        createdByDepartment:employeeCreatedDeparment[0].dept.deptName,
        designation:employeeCreatedDeparment[0].designation,
        status:"New",
      }
        //console.log(EmailBody);
        this.ticketService.SendEmailTicket(EmailBody).subscribe((res: any) => {
         });
      this.toastr.success("Added Sucessfully");
      this.NewTicketForm.reset();
      this.ticketmaster();
    });
  }
  ondepartmentChange() {
    this.employee = [];
    this.employee = this.EmployeeResponses.filter(
      (obj) => obj.dept.deptCode === this.NewTicketForm.get("department").value
    );
  }

  files: FileList;
  selectFile(event) {
    // this.uploadFile(event.target.files);
    this.files = event.target.files;
  }
  upload(TicketId) {
    let file: File;
    file = this.files[0];
    this.ticketService
      .UploadAttachment(file, TicketId)
      .subscribe((res: any) => {});
  }

  onUpdate() {
    let body: any;
    let employeeUpdateEmail = this.EmployeeResponses.filter(
      (obj) => obj.empID === Number(this.updateForm.get("assignTo").value)
    );
    let employeeName = this.EmployeeResponses.filter(
      (obj) => obj.empID === Number(this.updateForm.get("empId").value)
    );
    let employeeEmp = this.EmployeeResponses.filter(
      (obj) => obj.empID === Number(this.updateForm.get("assignTo").value)
    );
    let employeeCreated = this.EmployeeResponses.filter(
      (obj) => obj.empID === Number(this.updateForm.get("assignTo").value)
    );
    let employeeDepartment = this.EmployeeResponses.filter(
      (obj) => obj.empID === Number(this.updateForm.get("assignTo").value)
    );
    let employeeCreatedDeparment = this.EmployeeResponses.filter(
      (obj) => obj.empID === Number(this.updateForm.get("assignTo").value)
    );
    let ticketStatus = this.statusResponses.filter(
      (obj) => obj.id === Number(this.updateForm.get("status").value)
    );

    //statusResponses
    body = {
      // id: this.updateuserid[0].id,
      ticketId: this.updateticketid[0].ticketId,
       requestId: this.updateticketid[0].requestId,
      status: Number(this.updateForm.get("status").value),
      remark: this.updateForm.get("remark").value,
      lastModifiedBy: Number(localStorage.getItem("empID")),
    };
    this.ticketService.ticketDetailsUpdate(body).subscribe((res: any) => {
      // let employee = this.EmployeeResponses.filter(
      //   (obj) => obj.empID === Number(this.updateForm.get("assignTo").value)
      // );
      // let employeeName = this.EmployeeResponses.filter(
      //   (obj) => obj.empID === Number(this.updateForm.get("assignTo").value)
      // );
      // let employeeEmp = this.EmployeeResponses.filter(
      //   (obj) => obj.empID === Number(this.updateForm.get("empId").value)
      // );
      // let employeeCreated = this.EmployeeResponses.filter(
      //   (obj) => obj.empID === Number(this.updateForm.get("empId").value)
      // );
      let EmailBody={
        ticketId: this.updateticketid[0].ticketId,
        subject: this.updateForm.get("subject").value,
        description: this.updateForm.get("description").value,
        department: employeeDepartment[0].department,
        assignTo: employeeName[0].empName,
      //  assignTo: employeeCreatedDeparment[0].empName,
      //  createdBy:employeeCreated[0].empName,
        createdBy:employeeCreatedDeparment[0].empName,
        assignEmail:employeeUpdateEmail[0].eMailID,
        createdByEmail:employeeEmp[0].eMailID,
        createdByDepartment:employeeCreatedDeparment[0].dept.deptName,
        designation:employeeCreatedDeparment[0].designation,
        //status:Number(this.updateForm.get("status").value),
        status:ticketStatus[0].status,
      }
        // console.log("EmailBody",EmailBody);
         this.ticketService.SendEmailTicket(EmailBody).subscribe((res: any) => {
         });
      this.toastr.success("Updated Sucessfully");
      this.ticketmaster();
      this.closeModal.nativeElement.click();
    });
  }
  remarkDetails: any = [];
  editCustomer(ticketId: any,assignTo:any ,empId:any) {
    this.baseUrl = null;
    this.ticketService.ticketDetailsRemark(ticketId).subscribe((res: any) => {
      //console.log("Res", res);
      this.remarkDetails = res;
      // this.ticketmaster=res;
    });

    this.updateForm.controls["assignTo"].setValue(assignTo);
    this.updateForm.controls["empId"].setValue(empId);
    this.updateticketid = [];
    this.updateticketid = this.ticketmasterDetails.filter(
      (item) => item.ticketId == ticketId
    );

    if (this.updateticketid[0].pat) {
      this.baseUrl =
        baseUrl + "TicketAttach/" + this.updateticketid[0].pat.path;
    }
    //    console.log(baseUrl+"TicketAttach/"+ this.updateticketid[0].pat.path);
    this.updateModal.nativeElement.click();
    this.updateForm.controls["requestId"].setValue(
      this.updateticketid[0].requestId
    );
    this.updateForm.controls["subject"].setValue(
      this.updateticketid[0].subject
    );
    this.updateForm.controls["status"].setValue(this.updateticketid[0].status);
    this.updateForm.controls["priority"].setValue(
      this.updateticketid[0].priority
    );
    this.updateForm.controls["category"].setValue(
      this.updateticketid[0].category
    );
    this.updateForm.controls["description"].setValue(
      this.updateticketid[0].description
    );
  }
}
