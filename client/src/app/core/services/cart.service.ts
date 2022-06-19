import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
    providedIn: "root"
})

export class CartService{

    baseUrl = "http://localhost:3000/cart/";
    cartAddUrl;
    cartGetUrl;
    constructor(private httpClient: HttpClient){

    }

    public addProductIntoCart(payload : Object){

        this.cartAddUrl = this.baseUrl + '/add_cart';
        console.log("Cart Http Client Called ");
        return this.httpClient.post(this.cartAddUrl,payload);
    }

    public getCartDetails(){
            
            this.cartGetUrl = this.baseUrl + '/get_cart';
            console.log("Cart Http Client Called ");
            return this.httpClient.get(this.cartGetUrl);
    }
}