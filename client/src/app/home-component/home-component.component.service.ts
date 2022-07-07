import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPService } from '../core/services/ip.service';
import swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class GetProductService{

    //baseUrl = 'http://localhost:3000/product/get_products';

    
    constructor(private http: HttpClient, private ipService : IPService){

    }

    public getAllProducts(){
      
        const baseUrl = this.ipService.getTargetHost() + '/product/get_products' 
        console.log("Get Product Function Called");
        return this.http.get(baseUrl);

    }
}