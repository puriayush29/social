import { Injectable, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import * as Register from './registration-component/registration-component.component';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  flag:boolean = false;
  authentication:string;
  constructor(private route:Router)
  {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.flag)
    {
    return true;
    }
  
    else {
     this.route.navigate(['/register'],{ skipLocationChange: true });
      return false;
    }

  }
  
}
