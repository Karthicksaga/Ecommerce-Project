//used for filtering the data or content
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  { IPService } from './ip.service'
import { User } from  '../model/user.model';
import { ServerResponse } from '../model/serverResponse.model';
// const baseUrl = 'http://localhost:3000/api/users';
// const registerEndpoint = baseUrl + '/customerRegistration';
// const loginEndpoint = baseUrl + '/login';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient, private ipService:IPService) { 

    }
    //payload nothing but the data we send to the server
  register(payload: object) {
    const baseUrl = this.ipService.getTargetHost() +'/api/users' ;
    const registerEndpoint  = baseUrl +  '/customerRegistration';

    console.log(payload);
    console.log(JSON.stringify(payload));
    return this.http.post(registerEndpoint, payload);
  }

  login(payload : object) {
     
      const baseUrl = this.ipService.getTargetHost() +'/api/users' ;
      const loginEndpoint = baseUrl + '/login';
      console.log(payload);
      return this.http.post(loginEndpoint, payload);
  }

  updateUserById(userId:String, payload : String){
    console.log("Update User Profile");
    const baseUrl = this.ipService.getTargetHost() +'/api/users' ;
    const updateUserEndPoint = baseUrl + "/edit-user/" + userId;
    console.log(payload);
    return this.http.post(updateUserEndPoint, payload);
  }
  getUserById(id : String){
    console.log('Get User By Id');
    const baseUrl = this.ipService.getTargetHost() +'/api/users' ;
    const getUserEndPoint = baseUrl + '/' + id;
    return this.http.get(getUserEndPoint);
  }

  getAllUsers(){
    console.log('Get All Users');
    const baseUrl = this.ipService.getTargetHost() +'/api/users' ;
    const getAllUsersEndPoint = baseUrl + '/allUsers'; 
    return this.http.get(getAllUsersEndPoint);
  }

  deleteUserById(id : String){
    console.log('Remove the User By From the DataBase');
    //api/users/removeUser/62b1ecccbc52790353096dca
    const baseUrl = this.ipService.getTargetHost() +'/api/users/removeUser/';
    const deleteUserEndPoint = baseUrl + id;
    console.log(deleteUserEndPoint);
    return this.http.delete(deleteUserEndPoint);
  }
  


  
}