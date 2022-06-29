import { Component, OnInit } from '@angular/core';
import { OrderService } from '../core/services/order.service'
import { Router } from '@angular/router';
import swal from '\sweetalert2'

@Component({
  selector: 'app-all-order-list',
  templateUrl: './all-order-list.component.html',
  styleUrls: ['./all-order-list.component.css']
})
export class AllOrderListComponent implements OnInit {

  orderList:any = [];
  userId;
  //create array of ProductList
  // products: ProductModel[] = [
  //   new ProductModel(1, 'Product 1', 100, 'https://via.placeholder.com/150', 'Test Product'),
  // ]
  constructor(private orderService: OrderService
    ,private router: Router) { }

  ngOnInit(): void {
    this.getUsersOrder();
  }


  getUsersOrder(){

    if(localStorage.getItem('userId') !== undefined){
      this.userId = localStorage.getItem('userId');
    }
    const requestBody = {
      userId : this.userId
    }
    this.orderService.orderByUserId(requestBody).subscribe((response) => {
      console.log("Got Product from the Server" + response);

      const serverResponse = response['response'];
      if(serverResponse['success'] ===  true) {
        this.orderList = serverResponse['data'];
        console.log("Order List : " + this.orderList);
        swal.fire({
          title: 'Success',
          text:serverResponse['message'],
          icon : "success",
          timer : 1000

        })
      }else{
        swal.fire({
          title: 'Error',
          text:serverResponse['message'],
          icon : "error",
          timer : 1000
        })
      }
    }, (error) => {

      swal.fire({

        title : 'Error',
        text : '',
        icon : 'error', 
        confirmButtonText : 'No Orders Found'
      }).then((result) => {
        console.log(result);
        this.router.navigate['/home']
      })
    })
  }



}
