import { Component, OnInit } from '@angular/core';
import { CommonService } from '../core/services/common.service'
import { Router } from '@angular/router';
import { CartService } from '../core/services/cart.service';
import jwt_decode, {JwtPayload} from 'jwt-decode'
import swal from 'sweetalert2';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {

  userId:String;
  responseData : any;
  cartProductList : any;
  totalAmount: Number;
  empty:boolean  = false;

  constructor(private router : Router, private cartService : CartService,
    private commonService : CommonService) { }

  ngOnInit(): void {
    this.getCartDetails();
  }


  public getCartDetails(){

    console.log("Get Cart Function Called ......");


    const userToken = this.commonService.getToken();
    const decodedToken = jwt_decode<JwtPayload>(userToken);
        console.log(decodedToken);
        console.log("Decoded Token" + decodedToken);

    this.userId = decodedToken['_id'];
    console.log("UserId : " + this.userId);
    if(this.userId != null && this.userId != undefined){

      const requestBody = {"userId":this.userId}
      this.cartService.getCartDetails(requestBody).subscribe((response) => {

        const serverResponse = response['response'];
        if(serverResponse['success'] ===  true){

          this.responseData = serverResponse['data'];
          this.cartProductList = this.responseData['product'];
          this.totalAmount = this.responseData['totalPrice']
          this.empty = true;
          swal.fire({
             'title' : 'Success',
             'text' :serverResponse['message'],
             "icon" : 'success',
             timer : 1000
          });

        }else{
          swal.fire({
            title : 'Error',
            text : serverResponse['message'],
            icon : 'error'
          })
        }
      },
      (error: any) => {
        console.log(error);
      })
    }else{
      
      swal.fire({

        'title' : 'Information',
        'text' : "Please Login First",
        'icon' : "info" 
      })
    }

  }

  onEdit(productId:string, quantity:number){

    localStorage.setItem('quantity', quantity.toString());
    this.router.navigate(['/cart/product-details/' + productId])

  }

}
