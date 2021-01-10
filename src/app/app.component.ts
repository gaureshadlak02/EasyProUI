import { Component, Inject } from '@angular/core';
import {baseUrl,UrlNames} from 'app/services/url-provider';
import { WINDOW } from 'app/services/window.providers';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(@Inject(WINDOW) private window: Window){
    console.log(this.window.location.hostname);
  }
  title = 'app works!';
//  if(this.router.url star)
//    baseUrl = 'http://192.168.16.9:401/';
//  baseUrl = 'http://212.12.179.132:401/';
}
