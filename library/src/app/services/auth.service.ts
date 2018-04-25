import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user';


@Injectable()
export class AuthService {
  private BASE_URL = 'https://localhost:8400/api';

  constructor(private http: HttpClient) {}
  
  isAuthenticated: boolean = false;

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(user: User): Observable<any> {
    const url = `${this.BASE_URL}/login`;
    console.log('user in auth.service: '+user.email+', '+user.password+', ');
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<User>(url, {email:user.email, password:user.password}, options);
  }
 
  
}
