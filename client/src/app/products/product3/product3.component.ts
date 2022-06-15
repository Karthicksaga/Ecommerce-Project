import { Component, OnInit } from '@angular/core';
import { Product3Service } from './product3.component.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product3',
  templateUrl: './product3.component.html',
  styleUrls: ['./product3.component.css']
})
export class Product3Component implements OnInit {

    products: any[]
    username: any

    constructor(private router:Router,
        private service:Product3Service) { 
    }

    ngOnInit(): void {
        
    }

  getAllProducts(): void {
    this.service
      .getAllProductService()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.products = response['data']
        } else {
          alert('error')
        }
      })
  }

  OnSelectProduct(id: number) : void {
    this.router.navigate(['/product/product_details/'+id])
  }

}
