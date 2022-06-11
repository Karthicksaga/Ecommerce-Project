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
    constructor(){

    }

    //admin Boolean Value is Stored in the Observable
    public setValue(isAdmin:boolean){
        this.isUserLogged.next(isAdmin);
    }

    public getValue():Observable<boolean>{
        return this.isUserLogged.asObservable();
    }

    clearMessages() {
        this.isUserLogged.next(false);
    }


    public setUserLoginStatus(loginStatus:boolean){
        this.userLoggedIn.next(loginStatus);
    }

    public getUserLoginStatus():Observable<boolean>{
        return this.userLoggedIn.asObservable();
    }

    public clearUserLoginStatus(){
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
}

