import { Injectable } from '@angular/core';
import {} from '@angular/core';
import { IPService} from './ip.service'
import { HttpClient } from '@angular/common/http';

@Injectable({
    'providedIn' : 'root'
})

export class OrderService{

    constructor(private http: HttpClient, private ipService : IPService){}

    //baseUrl = "http://localhost:3000/"
    
    public confirmOrder(payload:Object){

       const baseUrl = this.ipService.getTargetHost() +'/';
       console.log(JSON.stringify(payload));
       const postOrderEndPoint = baseUrl + 'order/confirmOrder';
       return this.http.post(postOrderEndPoint,payload);

    }

    public getAllOrders(){

        const baseUrl = this.ipService.getTargetHost() +'/';
        const getOrdersEndPoint = baseUrl + 'order/getAllOrder';
        return this.http.get(getOrdersEndPoint);
    }

    public orderByUserId(payload : Object){

        const baseUrl = this.ipService.getTargetHost() +'/';
        const getOrderByUserId = baseUrl + 'order/getUserOrder';
        return this.http.post(getOrderByUserId, payload);
    }
    
}