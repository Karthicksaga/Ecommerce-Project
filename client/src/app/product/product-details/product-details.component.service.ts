import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class ProductDetailsService{

        baseUrl = 'http://localhost:3000/product';
        urlBuilder;
        constructor(private httpClient : HttpClient){

        }

        public getProductDetailsById(id: String){

            this.urlBuilder = this.baseUrl + "/get_product/" +id;
            console.log("Get the Product ......");
            return this.httpClient.get(this.urlBuilder);
        }
        
    
}