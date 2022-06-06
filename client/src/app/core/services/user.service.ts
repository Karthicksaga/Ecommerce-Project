//used for filtering the data or content
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from  '../model/user.model';
import { ServerResponse } from '../model/serverResponse.model';
const baseUrl = 'http://localhost:3000/api/users';
const registerEndpoint = baseUrl + '/register';
const loginEndpoint = baseUrl + '/login';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { 

    }
    //payload nothing but the data we send to the server
  register(payload: object): Observable<User> {
    console.log(payload);
    return this.http.post<User>(registerEndpoint, payload);
  }

  login(payload : object) : Observable<{email:string, password:string}> {
      return this.http.post<{email:string, password:string}>(loginEndpoint, payload);
  }


  
}