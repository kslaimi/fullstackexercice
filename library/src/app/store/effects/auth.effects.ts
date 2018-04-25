import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { tap } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { AuthActionTypes } from '../actions/auth.actions';
import { LogIn } from '../actions/auth.actions';
import { LogInSuccess } from '../actions/auth.actions';
import { LogInFailure } from '../actions/auth.actions';
import { LogOut } from '../actions/auth.actions';

@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

  // effects go here
 @Effect()
LogIn: Observable<any> = this.actions
  .ofType(AuthActionTypes.LOGIN)
  .map((action: LogIn) => action.payload)
  .switchMap(payload => {
    return this.authService.logIn(payload)
      .map((user) => {
        console.log("logged user: "+user);
        return new LogInSuccess({token: user.token, email: payload.email});
      })
      .catch((error) => {
        console.log('login error: '+error);
        return Observable.of(new LogInFailure({ error: error }));
      });
  });
  
 @Effect({ dispatch: false })
LogInSuccess: Observable<any> = this.actions.pipe(
  ofType(AuthActionTypes.LOGIN_SUCCESS),
  tap((user) => {
    localStorage.setItem('token', user.payload.token);
    this.authService.isAuthenticated = true;
    this.router.navigateByUrl('/books');
  })
);

@Effect({ dispatch: false })
LogInFailure: Observable<any> = this.actions.pipe(
  ofType(AuthActionTypes.LOGIN_FAILURE)
);

@Effect({ dispatch: false })
LogOut: Observable<any> = this.actions.pipe(
  ofType(AuthActionTypes.LOGOUT),
  tap((user) => {
    localStorage.removeItem('token');
     this.authService.isAuthenticated = false;
     this.router.navigateByUrl('/');
  })
);

}