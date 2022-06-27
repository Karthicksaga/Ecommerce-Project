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

        console.log(payload);
        this.cartAddUrl = this.baseUrl + 'add_cart';
        console.log("Add to Cart Data is Called ");
        return this.httpClient.post(this.cartAddUrl,payload);
    }

    public updateCartDetails(payload : Object){

        console.log(payload);
        const cartUpdateUrl = this.baseUrl + 'update_cart';
        return this.httpClient.post(cartUpdateUrl, payload);
    }
    // public getCartDetails(payload: any)
            
    //         this.cartGetUrl = this.baseUrl + '/get-cart';
    //         console.log("Cart Http Client Called ");
    //         return this.httpClient.post(payload,this.cartGetUrl);
    // }

    public getCartDetails(payload : any){
        console.log("Get Cart Details Function Called ....\n");
        console.log(payload);
        this.cartGetUrl = this.baseUrl + 'get-cart'
        return this.httpClient.post(this.cartGetUrl, payload);
    }
}