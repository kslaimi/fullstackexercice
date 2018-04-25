import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { LogOut } from '../../store/actions/auth.actions';
import { AppState, selectAuthState } from '../../store/app.states';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  user: null;
  isAuthenticated: false;
  getState: Observable<any>;
  errorMessage: string | null;

  constructor( private store: Store<AppState>) { 
   this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
	  this.getState.subscribe((state) => {
	      this.isAuthenticated = state.isAuthenticated;
	      this.user = state.user;
	      this.errorMessage = state.errorMessage;
    });
    
  }
  
   logOut(): void {
  		this.store.dispatch(new LogOut);
  }

}
