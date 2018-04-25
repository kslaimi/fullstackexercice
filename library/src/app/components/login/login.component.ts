import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { User } from '../../models/user';
import { AppState, selectAuthState } from '../../store/app.states';
import { LogIn } from '../../store/actions/auth.actions';
import { LogOut } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-log-in',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  isAuthenticated: false;
  getState: Observable<any>;
  errorMessage: string | null;

  constructor( private store: Store<AppState>) { 
   this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
	  this.getState.subscribe((state) => {
	      this.isAuthenticated = state.isAuthenticated;
	      this.errorMessage = state.errorMessage;
    });
    
  }

  onSubmit(): void {
    console.log('login in login.component.ts: '+this.user.email);
    this.store.dispatch(new LogIn(this.user));
  }
  
    logOut(): void {
  		this.store.dispatch(new LogOut);
  }

}