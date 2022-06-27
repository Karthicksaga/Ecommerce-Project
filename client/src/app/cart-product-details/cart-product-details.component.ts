import { Component, OnInit } from '@angular/core';
import { ProductDetailsService } from '../product/product-details/product-details.component.service';
import { Router,ActivatedRoute } from '@angular/router';
import { CommonService } from '../core/services/common.service';
import { CartService } from '../core/services/cart.service';
import swal from 'sweetalert2';
import jwt_decode, { JwtPayload } from 'jwt-decode'

@Component({
  selector: 'app-cart-product-details',
  templateUrl: './cart-product-details.component.html',
  styleUrls: ['./cart-product-details.component.css']
})
export class CartProductDetailsComponent implements OnInit {

  product: any
    productPrice:number;
    count: number = 1
    rate: number;
    id: String;
    userId:string;
    productId:string;

    constructor(private productDetailService:ProductDetailsService,
        private activateRoute:ActivatedRoute,
        private productDetailsService: ProductDetailsService,
        private commonService : CommonService,
        private cartService : CartService,
        private router:Router) {
         
        // is used to snapshot the params 
        this.id = this.activateRoute.snapshot.params['id'];
        console.log("Product Id :" + this.id);
      
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
                    
                    if(localStorage.getItem !== undefined){
                      this.count = parseInt(localStorage.getItem('quantity'));
                      this.rate = this.productPrice * this.count;
                    }else{
                      swal.fire({
                        'title' : 'Error',
                        text : 'quantity is not found',
                        icon : 'error'
                      })
                    }
                   

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
     onAddToCart(prodId : string){
      const requestBody = {};
      console.log(this.commonService.getToken());
      let userToken = this.commonService.getToken();
      if(userToken !== null && userToken !==undefined){
        const decodedToken = jwt_decode<JwtPayload>(userToken);
        console.log(decodedToken);
        console.log("Decoded Token" + decodedToken);

        this.userId = decodedToken['_id'];
        this.productId = prodId;
        
        if(localStorage.hasOwnProperty('quantity')){
          localStorage.removeItem('quantity');
        }
        if(this.userId != null && this.userId != undefined && this.productId != null && this.productId != undefined
          && this.count != null && this.count != undefined){
            requestBody['productId'] = this.productId;
            requestBody['userId'] = this.userId;
            requestBody['quantity'] = this.count

            console.log(requestBody);
            this.cartService.addProductIntoCart(requestBody)
            .subscribe(response =>{
              const serverResponse = response['response'];
              if(serverResponse != null && serverResponse != undefined){

                if(serverResponse['success'] == true){

                  swal.fire({
                    "title" : "Success",
                    "text" : serverResponse['message'],
                    "icon" : 'success'
                  })

                }else{
                  swal.fire({
                    "title" : "Error",
                    "text" : serverResponse['message'],
                    "icon" : 'error'
                  })
                }

              }else{
                swal.fire({
                  "title": "Error",
                  "text" : "Internal Server Error",
                  "icon" : "error"  
                })
              }
            })

          }else{

            swal.fire({
              title : "Information",
              text: 'Please add the quantity',
              icon : 'info'
            })
          }
        
        

      }else{
        swal.fire({
          title: 'Information',
          text : "Please login  First and purchase the Product",
          icon: 'info'
        })
      }
     }

}
