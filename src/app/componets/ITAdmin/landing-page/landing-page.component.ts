import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  isAdmin = false;
  isSalesEstimation= false;
  showFiller = false;
  userName: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userName= localStorage.getItem('username');
    if(localStorage.getItem('usertypeid') === '1'){
      this.isAdmin = true;
     // this.isSalesEstimation = true;
    }
    // if(localStorage.getItem('usertypeid') === '4'){
    //   this.isSalesEstimation = true;
    // }
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
