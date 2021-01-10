import { Component, OnInit } from "@angular/core";
import { NgModel, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
//import { AuthService } from "app/services/auth.service";
import { ItAdminService } from '../../../services/it-admin.service';
import { ToastrService } from "ngx-toastr";
import * as CryptoJS from 'crypto-js';
import { baseUrl } from "app/services/url-provider";
import { importType } from "@angular/compiler/src/output/output_ast";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private router:Router,private itAdminService: ItAdminService,private toastr: ToastrService) {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
    });
  }
  ngOnInit() {}
  onSubmit() {
    if (this.loginForm.valid) {
      //console.log(this._v());
    }
    let body : any;
    body = {
      "Email" : this.loginForm.get('email').value,
      "Password" : this.loginForm.get('password').value
    }
    this.itAdminService.login(body).subscribe((response: any)=>{
      if( response){
        this.toastr.success('Loggedin Sucessfully');
        
        
       
        const email = CryptoJS.AES.encrypt(response.emailId, baseUrl.substr(3)).toString();
        localStorage.setItem("email",email);
        localStorage.setItem("empID",response.empId.toString());
        localStorage.setItem("token",response.token);
        localStorage.setItem("usertypeid",response.userTypeId);
        localStorage.setItem("username",response.userName);
      
        this.router.navigate(['/home']);

      }
    })
  }
  _v() {
    return this.loginForm.value;
  }
  
}
