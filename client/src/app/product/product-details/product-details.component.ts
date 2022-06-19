import { Component, OnInit } from '@angular/core';
import { ProductDetailsService } from './product-details.component.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

    product: any
    productPrice:number;
    count: number = 1
    rate: number;
    id: String

    constructor(private productDetailService:ProductDetailsService,
        private activateRoute:ActivatedRoute,
        private cartService: ProductDetailsService,
        private route:Router) {
         
        // is used to snapshot the params 
        this.id = this.activateRoute.snapshot.params['id'];
      
        if(this.id)
        {
            this.productDetailService.getProductDetailsById(this.id).subscribe(response => {
              if(response != null)
              {
                  let serverResponse = response['response'];
                  if(serverResponse['success'] === true){
                    this.product = serverResponse['data'][0];
                    this.productPrice = this.product['price'];
                    console.log(this.productPrice);
                    this.rate = this.productPrice;
                    console.log(this.product);
                    swal.fire({
                      title: 'Success',
                      text:serverResponse['message'],
                      icon : "success",
                      timer : 500
                    })
                  }else{
                    swal.fire({
                      title: 'Error',
                      text:serverResponse['message'],
                      icon : "error",
                  })
                  
                  this.route.navigate(['/productNotFound'])
              }
            }else{
              swal.fire({
                title: 'Error',
                text:'Internal Server Error',
                icon : "error",
              })
            }
            });

        }

     }

     ngOnInit(): void {
    }
  
     OnIncrement()
     {
        this.count = this.count + 1
        this.rate =this.productPrice * this.count
     }

     OnDecrement()
     {
        if(this.count == 1)
        {
            swal.fire({
                title: 'Alert',
                text: 'You cannot decrement more than 1',
                icon : "warning",
                timer : 1000
            })
        }
        else
        {
            this.count = this.count - 1
            this.rate = this.productPrice * this.count
        }
     } 
}
