import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate{
  
  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    console.log('url activated ? '+url);
    return this.checkLogin(url);
    //return true;
  }
  
  checkLogin(url: string): boolean {
  	console.log('this.authService.isAuthenticated: '+this.authService.isAuthenticated);
    if (this.authService.isAuthenticated) { return true; }
    this.router.navigate(['/']);
    return false;
  }

}
