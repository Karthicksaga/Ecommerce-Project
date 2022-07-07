import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IPService } from './ip.service'

@Injectable({
    providedIn: 'root'
})
export class CategoryService{

    //baseUrl = 'http://localhost:3000/api/category';
    constructor(private httpClient : HttpClient,
        private ipService : IPService) {

    }

    public getAllCategory() {
        const baseUrl = this.ipService.getTargetHost() + '/api/category';
        return this.httpClient.get(baseUrl);
    }
}