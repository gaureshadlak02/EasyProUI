import { Component, OnInit } from "@angular/core";
import { NgModel, FormGroup, FormControl, Validators } from "@angular/forms";
import { Registration } from "../models/registration";
import { Router } from "@angular/router";
import { AuthStorageService } from "app/services/auth-storage.service";
//import { AuthService } from "app/services/auth.service";
import { ItAdminService } from '../../../services/it-admin.service';
import { ToastrService } from "ngx-toastr";
import { baseUrl } from "app/services/url-provider";
import * as CryptoJS from 'crypto-js';

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  registration: Registration;
  empId: number;
  emailId: string;
  userName: string;
  password: string;
  isActive: boolean;
  userTypeId: number;
  cretedDate: Date;
  createBy: number;
  lastModifiedBy: number;
  lastModifiedDate: Date;

  constructor( private router :Router , private itAdminService : ItAdminService,private toastr: ToastrService) {
    
  }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      empId: new FormControl("", [Validators.required]),
      userName: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }
  onSubmit() {
    let body : any;
    body = {

      "EmailId" : this.registrationForm.get('email').value,
      "password" : this.registrationForm.get('password').value,
      "userName" : this.registrationForm.get('userName').value,
      "empId" : +this.registrationForm.get('empId').value
    }
    this.itAdminService.registration(body).subscribe((response: any)=>{
      // if( response===null){
         
         const email = CryptoJS.AES.encrypt(body.EmailId, baseUrl.substr(3)).toString();
        localStorage.setItem("email",email);
        this.toastr.success('Registered Sucessfully');
        this.router.navigate(['/home'])
      // }
    })
    
  }
}
