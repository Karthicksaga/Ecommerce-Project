//used for filtering the data or content
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from  '../model/user.model';
import { ServerResponse } from '../model/serverResponse.model';
import { IPService } from './ip.service';
import  { Product } from "../model/product.model";
//const baseUrl = 'http://localhost:3000/product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(private http: HttpClient, private ipService : IPService) { 
      
    }
    //payload nothing but the data we send to the server
  addProduct(payload: object): Observable<Product> {
    console.log(payload);
    const baseUrl = this.ipService.getTargetHost() + '/product'
    const createProductUrl = baseUrl + '/add_product';
    return this.http.post<Product>(createProductUrl, payload);
  }

  getProducts(payload:object) : Observable<Product[]> {
    const baseUrl = this.ipService.getTargetHost() + '/product'
      const getProductUrl = baseUrl + '/get-product';
      return this.http.get<Product[]>(getProductUrl, payload);
  }

  public getProductById(id : String) {
    const baseUrl = this.ipService.getTargetHost() + '/product'
    const getProductById = baseUrl + '/get_product/' + id;
    return this.http.get(getProductById);
  }

  public getAllProducts(){
    const baseUrl = this.ipService.getTargetHost() + '/product'
    const getAllProductsUrl = baseUrl + '/get_products';
    return this.http.get(getAllProductsUrl);
  }

  public updateProduct(productId:String,payload:Object){
    const baseUrl = this.ipService.getTargetHost() + '/product'
    const updateProductUrl = baseUrl + '/edit_product/'+productId;
      return this.http.post(updateProductUrl, payload);
  }

  public onDeleteProduct(id : String){

    console.log("Deleted Product : " + id);
    const baseUrl = this.ipService.getTargetHost() + '/product'
    const deleteProductUrl = baseUrl + '/delete_product/'+id;
    console.log("Deleted Products Id" + deleteProductUrl);
    return this.http.delete(deleteProductUrl);
  }


  
}