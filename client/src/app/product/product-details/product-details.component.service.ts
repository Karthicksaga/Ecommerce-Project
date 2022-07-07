import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { IPService } from 'src/app/core/services/ip.service';

@Injectable({
    providedIn: 'root'
})
export class ProductDetailsService{


       // baseUrl = 'http://localhost:3000/product';
        urlBuilder;
        constructor(private httpClient : HttpClient, private ipService : IPService){
        }

        public getProductDetailsById(id: String){

            //const  baseUrl = 'http://localhost:3000/product';
            const baseUrl = this.ipService.getTargetHost() +'/product';
            this.urlBuilder = baseUrl + "/get_product/" +id;
            console.log(this.urlBuilder);
            console.log("Get the Product ......");
            return this.httpClient.get(this.urlBuilder);
        }
        
    
}