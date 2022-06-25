//used for filtering the data or content
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from  '../model/user.model';
import { ServerResponse } from '../model/serverResponse.model';
const baseUrl = 'http://localhost:3000/api/users';
const registerEndpoint = baseUrl + '/customerRegistration';
const loginEndpoint = baseUrl + '/login';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { 

    }
    //payload nothing but the data we send to the server
  register(payload: object) {
    console.log(payload);
    console.log(JSON.stringify(payload));
    return this.http.post(registerEndpoint, payload);
  }

  login(payload : object) {
      
      console.log(payload);
      return this.http.post(loginEndpoint, payload);
  }

  updateUserById(userId:String, payload : String){
    console.log("Update User Profile");
    const updateUserEndPoint = baseUrl + "/edit-user/" + userId;
    return this.http.post(updateUserEndPoint, payload);
  }
  getUserById(id : String){
    console.log('Get User By Id');
    const getUserEndPoint = baseUrl + '/' + id;
    return this.http.get(getUserEndPoint);
  }

  getAllUsers(){
    console.log('Get All Users');
    const getAllUsersEndPoint = baseUrl + '/allUsers'; 
    return this.http.get(getAllUsersEndPoint);
  }

  deleteUserById(id : String){
    console.log('Remove the User By From the DataBase');
    const deleteUserEndPoint = baseUrl + '/delete';
    return this.http.delete(deleteUserEndPoint);
  }
  


  
}