import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStorageService } from './auth-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GenralGuard implements CanActivate {
  constructor(private _authStorage:AuthStorageService,private _router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return true;
    if(!localStorage.getItem('token'))
    {
      return true;
    }
    else
    {
    this._router.navigate(['/home'])
    return false;
    }
  }
  
}
