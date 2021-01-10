import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ItAdminService } from '../../../services/it-admin.service';
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { baseUrl } from "app/services/url-provider";
import * as CryptoJS from 'crypto-js';
import { from } from "rxjs";
@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"],
})
export class ChangePasswordComponent implements OnInit {
  changePassForm: FormGroup;

  constructor(
    private itAdminService: ItAdminService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.changePassForm = new FormGroup({
      passwordold: new FormControl("", [Validators.required]),
      passwordnew: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {}
  onSubmit() {
    let changeBody: any;
    const email = CryptoJS.AES.decrypt(localStorage.getItem("email"), baseUrl.substr(3)).toString(CryptoJS.enc.Utf8);
    changeBody = { 
      EmailId: email,
      OldPassword: this.changePassForm.get("passwordold").value,
      NewPassword: this.changePassForm.get("passwordnew").value,
    };
    this.itAdminService.changePassword(changeBody).subscribe((response: any) => {
      if (response) {
        if (response.success === true) {
          this.toastr.success("Password sucessfully updated");
          this.router.navigate(["/"]);
        }
      }
    });
  }
}
