import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPService } from 'src/app/core/services/ip.service';

@Injectable()
export class Product1Service {

    //url = 'http://localhost:3000/';

    constructor(private httpClient: HttpClient, private ipService: IPService) {}

    getProducts()  {
        return this.httpClient.get(this.url)
      }

    getProductsByCategoryId(cId : number){

      const categoryId = cId;
      const baseUrl = this.ipService.getTargetHost()
      const categoryRegisterPoint = baseUrl + "/product/getCategory/" + categoryId 
      return this.httpClient.get(categoryRegisterPoint);

     }
    
     
}