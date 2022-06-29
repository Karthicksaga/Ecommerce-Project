import { Injectable } from '@angular/core';
import {} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    'providedIn' : 'root'
})

export class OrderService{

    constructor(private http: HttpClient){}

    baseUrl = "http://localhost:3000/"
    public confirmOrder(payload:Object){

       console.log(JSON.stringify(payload));
       const postOrderEndPoint = this.baseUrl + 'order/confirmOrder';
       return this.http.post(postOrderEndPoint,payload);

    }

    public getAllOrders(){

        const getOrdersEndPoint = this.baseUrl + 'order/getAllOrder';
        return this.http.get(getOrdersEndPoint);
    }

    public orderByUserId(payload : Object){

        const getOrderByUserId = this.baseUrl + 'order/getUserOrder';
        return this.http.post(getOrderByUserId, payload);
    }
    
}