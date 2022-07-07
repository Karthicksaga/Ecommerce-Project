import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IPService } from './ip.service';

@Injectable({
    providedIn: "root"
})

export class CartService{

    //baseUrl = "http://localhost:3000/cart/";
    cartAddUrl;
    cartGetUrl;
    constructor(private httpClient: HttpClient, private ipService : IPService){

    }

    public addProductIntoCart(payload : Object){

        const baseUrl = this.ipService.getTargetHost()+ '/cart/'
        console.log(payload);
        this.cartAddUrl = baseUrl + 'add_cart';
        console.log("Add to Cart Data is Called ");
        return this.httpClient.post(this.cartAddUrl,payload);
    }

    public updateCartDetails(payload : Object){

        console.log(payload);
        const baseUrl = this.ipService.getTargetHost()+ '/cart/'
        const cartUpdateUrl = baseUrl + 'update_cart';
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
        const baseUrl = this.ipService.getTargetHost()+ '/cart/'
        this.cartGetUrl = baseUrl + 'get-cart'
        return this.httpClient.post(this.cartGetUrl, payload);
    }
}