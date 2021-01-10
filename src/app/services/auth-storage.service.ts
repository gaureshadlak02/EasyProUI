import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthStorageService {

  constructor( private _router:Router) { }
  logoutUser()
  {
    sessionStorage.removeItem('o-auth-key');
    this._router.navigate(['/']);
  }
  saveToken(key)
  {
    sessionStorage.setItem('o-auth-key',key);
  }
  getToken()
  {
 return sessionStorage.getItem('o-auth-key');
  }
  loggedIn()
  {
    return !!localStorage.getItem('email');
  }

}
