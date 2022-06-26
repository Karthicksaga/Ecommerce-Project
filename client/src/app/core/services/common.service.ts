import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import { Observable } from 'rxjs';
import decode from 'jwt-decode';
@Injectable({
    providedIn: 'root'
})

//here common Service is a Observable
export class CommonService {

    isUserLogged= new Subject<boolean>();
    userName = new Subject<String>();
    userLoggedIn = new Subject<boolean>();
    customerStatus = new Subject<boolean>();
    constructor(){

    }

    //admin Boolean Value is Stored in the Observable
    public setAdminUserStatus(isAdmin:boolean){
        this.isUserLogged.next(isAdmin);
    }

    public getAdminUserStatus():Observable<boolean>{
        return this.isUserLogged.asObservable();
    }

    public clearAdminUserStatus() {
        this.isUserLogged.next(false);
    }


    public setUserStatus(loginStatus:boolean){
        this.userLoggedIn.next(loginStatus);
    }

    public getUserStatus():Observable<boolean>{
        return this.userLoggedIn.asObservable();
    }

    public clearUserStatus(){
        this.userLoggedIn.next(false);
    }

    public setUserName(name : String){
        return this.userName.next(name);
    }

    public getUserName():Observable<String>{
        return this.userName.asObservable();
    }

    public clearUserName(){
        this.userName.next('');
    }

    public setToken(token:string){
        localStorage.setItem('token',token);
    }

    public getToken(){
        return localStorage.getItem('token');
    }

    public clearSessionToken(){
        localStorage.removeItem('token');
    }

    public setCustomerStatus(value : boolean){
        this.customerStatus.next(value);
    }
    
    public getCustomerStatus():Observable<boolean>{
        return this.customerStatus.asObservable();
    }

    public clearCustomerStatus(){
        return this.customerStatus.next(false);
    }
}

