import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../core/services/order.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  name:String;
  email:String;
  address:string;
  state:string;
  city:string;
  paymentType:string;
  phone:string;
  pinCode:string;
  requestBody:Object = {};
  userId:string;
  totalAmount:number;

  constructor(private router : Router, 
              private orderService : OrderService) { }

  ngOnInit(): void {
  }

  onConfirmOrder(){


    if(localStorage.getItem("totalAmount") !== undefined && localStorage.getItem("userId") !== undefined){
       this.userId = localStorage.getItem('userId');
       this.totalAmount = parseInt(localStorage.getItem('totalAmount'));
    }
    

    

    if(this.name != null && this.name != undefined
      && this.email != undefined && this.email != null){

       this.requestBody = {
          name : this.name,
          address : this.address,
          state: this.state,
          city : this.city,
          paymentType : parseInt(this.paymentType),
          phone: parseInt(this.phone),
          email: this.email,
          pinCode: parseInt(this.pinCode),
          totalAmount: this.totalAmount,
          userId : this.userId
        };

        console.log("Request Body : " + JSON.stringify(this.requestBody));

        this.orderService.confirmOrder(this.requestBody)
        .subscribe((response) => {

          const serverResponse = response['response'];
          if(serverResponse['success'] == true){
            swal.fire({
              "title" : "Success",
              "text" : "Your Order has been successfully",
              "icon" : "success",
              confirmButtonText : "See your Orders",

            }).then((result) => {
              console.log("Result :" + result);
              this.router.navigate(['/users/orders'])
            })
            this.router.navigate(['/users/orders'])
          }else{

            swal.fire({
              "title" : "Error",
              "text" : "Failed to place the Order",
               "icon" : "error",
            })
          }

        }, (error) => {

          console.log("Error" + error);
          swal.fire({
            "title" : "Error",
            "text" : "Failed the Order",
             "icon" : "error",
          })
        })

      }

    
  }

}
