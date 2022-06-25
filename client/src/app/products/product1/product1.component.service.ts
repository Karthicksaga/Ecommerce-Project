import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class Product1Service {

    url = 'http://localhost:3000/';

    constructor(private httpClient: HttpClient) {}

    getProducts()  {
        return this.httpClient.get(this.url)
      }

    getProductsByCategoryId(cId : number){

      const categoryId = cId;
      const categoryRegisterPoint = this.url + "/products/getCategory/" + categoryId 
      return this.httpClient.get(categoryRegisterPoint);

     }
    
     
}