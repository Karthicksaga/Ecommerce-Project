import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class Product3Service {

    url = 'http://localhost:4000/product';
    constructor(private httpClient: HttpClient) { }
    

     getAllProductService() {
        return this.httpClient.get(this.url)
      }
    
     
}

