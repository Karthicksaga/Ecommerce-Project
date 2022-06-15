import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class Product2Service {

    url = 'http://localhost:4000/MRlogin/ayurvedic'
    constructor(private httpClient: HttpClient) { }
    

    getAllProductService() {
        return this.httpClient.get(this.url)
      }
    
     
}

