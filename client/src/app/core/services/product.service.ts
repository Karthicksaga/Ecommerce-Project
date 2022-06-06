//used for filtering the data or content
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from  '../model/user.model';
import { ServerResponse } from '../model/serverResponse.model';
import  { Product } from "../model/product.model";
const baseUrl = 'http://localhost:3000/api/product';
const createProduct = baseUrl + '/add-product';
const getProduct = baseUrl + '/get-product';


@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(private http: HttpClient) { 

    }
    //payload nothing but the data we send to the server
  register(payload: object): Observable<Product> {
    console.log(payload);
    return this.http.post<Product>(createProduct, payload);
  }

  getProducts(payload:object) : Observable<Product[]> {
      return this.http.get<Product[]>(getProduct, payload);
  }

  
}