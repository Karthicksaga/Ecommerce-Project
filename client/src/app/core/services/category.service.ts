import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class CategoryService{

    baseUrl = 'http://localhost:3000/api/category';
    constructor(private httpClinet : HttpClient) {

    }

    public getAllCategory() {
        return this.httpClinet.get(this.baseUrl);
    }
}