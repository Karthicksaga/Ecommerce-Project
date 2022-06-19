//used for filtering the data or content
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from  '../model/user.model';
import { ServerResponse } from '../model/serverResponse.model';
import  { Product } from "../model/product.model";
const baseUrl = 'http://localhost:3000/product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(private http: HttpClient) { 

    }
    //payload nothing but the data we send to the server
  addProduct(payload: object): Observable<Product> {
    console.log(payload);
    const createProductUrl = baseUrl + '/add-product';
    return this.http.post<Product>(createProductUrl, payload);
  }

  getProducts(payload:object) : Observable<Product[]> {
      const getProductUrl = baseUrl + '/get-product';
      return this.http.get<Product[]>(getProductUrl, payload);
  }

  public getProductById(id : String) {
    const getProductById = baseUrl + '/get-product/' + id;
    return this.http.get(getProductById);
  }

  public getAllProducts(){
    const getAllProductsUrl = baseUrl + '/get_products';
    return this.http.get(getAllProductsUrl);
  }

  public updateProduct(payload:Object){
    const updateProductUrl = baseUrl + '/update-product';
      return this.http.post(updateProductUrl, payload);
  }

  public onDeleteProduct(id : String){
    const deleteProductUrl = baseUrl + '/delete_product '+id;
    console.log("Deleted Products Id" + deleteProductUrl);
    return this.http.delete(deleteProductUrl);
  }


  
}