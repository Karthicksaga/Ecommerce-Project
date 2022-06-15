import { Component, OnInit } from '@angular/core';
import { Product2Service } from './product2.component.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product2',
  templateUrl: './product2.component.html',
  styleUrls: ['./product2.component.css']
})


export class Product2Component implements OnInit {

    Products: any[]
    username: any

    constructor(private router:Router,
        private service:Product2Service) { 
      // this.loadflag()
      //this.loadAllProducts()
    }

  getAllProduct() {
    this.service
      .getAllProductService()
      .subscribe(response => {
        if (response['status'] == 'success') {
          if(response['data'].length > 0) {
            this.Products = response['data'];
          }
        } else {
          alert(response['message']);
        }
      })

  }

    ngOnInit() { 
    
    }


  OnSelectProduct(id: number) {
    this.router.navigate(['product/product_details/'+id])
  }

}

