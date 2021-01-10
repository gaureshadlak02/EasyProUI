import { Component, OnInit } from '@angular/core';
import { HrpayrollService } from '../../../services/hrpayroll.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  data: any;

  constructor(private hrpayrollService: HrpayrollService) { }

  ngOnInit(): void {
    const id = +localStorage.getItem('empID');
    this.hrpayrollService.userProfileById(id).subscribe((res: any) => {
      if(res){
        this.data=res;
      ;}
          });
  }

}
