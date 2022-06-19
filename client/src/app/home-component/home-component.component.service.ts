import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class GetProductService{

    baseUrl = 'http://localhost:3000/product/get_products';
    constructor(private http: HttpClient){

    }

    public getAllProducts(){
      
        console.log("Get Product Function Called");
        return this.http.get(this.baseUrl);

    }
}