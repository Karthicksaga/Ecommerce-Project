import { Component, OnInit } from '@angular/core';
import { ProductDetailsService } from './product-details.component.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../core/services/common.service';
import swal from 'sweetalert2';
import { CartService } from '../../core/services/cart.service';
import jwt_decode, {JwtPayload}from 'jwt-decode';


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
        private commonService : CommonService,
        private router:Router) {
         
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
                  
                  this.router.navigate(['/productNotFound'])
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

     OnBack(){
      this.router.navigate(["/home"])
     }
     onAddToCart(){
      console.log(this.commonService.getToken());
      let userToken = this.commonService.getToken();
      if(userToken !== null && userToken !==undefined){

        const decodedToken = jwt_decode<JwtPayload>(userToken);
        console.log(decodedToken);

      }else{
        swal.fire({
          title: 'Information',
          text : "Please login  Firet and purchase the Product",
          icon: 'info'
        })
      }
     }
}
