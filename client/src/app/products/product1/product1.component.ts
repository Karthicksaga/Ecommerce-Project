import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product1Service } from  './product1.component.service'
import swal from 'sweetalert2';

@Component({
  selector: 'app-product1',
  templateUrl: './product1.component.html',
  styleUrls: ['./product1.component.css']
})

export class Product1Component implements OnInit {

  Products: any[]
  username: any

  constructor(private router:Router,
      private product1Service:Product1Service) { 
  }

  public getAllProducts() {
  this.product1Service
    .getProducts()
    .subscribe(response => {
      console.log(response);
      if(response['success'] ===  true) {
        if(response['data'].length > 0) {

          this.Products = response['data'];
          swal.fire({
            title: 'Success',
            text:response['message'],
            icon : "success"
          })
        }
      }else{
        alert(response['message']);
        swal.fire({
          title: 'Error',
          text:response['message'],
          icon : "error"
        })
      }
    })
    
}
  ngOnInit() { 
  
  }

OnSelectProduct(id: number) {
  this.router.navigate(['/product/product_details/'+id])
}

}
