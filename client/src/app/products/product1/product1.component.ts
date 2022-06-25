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
  categoryId = 1;

  constructor(private router:Router,
      private product1Service:Product1Service) { 
  }


  public getAllProductByCategory(){

    this.product1Service
    .getProductsByCategoryId(this.categoryId)
    .subscribe(response => {
      console.log("Server Response : " + response);
      const serverResponse = response['response'];

      if(serverResponse['status']  === true){
        this.Products = serverResponse['data'];
        if(this.Products !== null){
          swal.fire({
            title : "Success",
            "text" : serverResponse['message'],
            icon : "success",
            timer : 2000
          });
        }else{
          swal.fire({
              title : "Error",
              "text" : serverResponse['message'],
              icon: "success",
              timer : 2000
          })
        }
      }else{
        console.log("Server Response" + serverResponse);
        swal.fire({
          title : "Error",
          text : serverResponse['message'],
          icon : "error",
          timer : 2000
        })
      }
    }
    )
  }

  public getAllProducts() {
  this.product1Service
    .getProducts()
    .subscribe(response => {
      console.log(response);
      const serverResponse = response;
      if(serverResponse['success'] ===  true) {
        if(serverResponse['data'].length > 0) {

          this.Products = serverResponse['data'];
          swal.fire({
            title: 'Success',
            text:response['message'],
            icon : "success",
            timer : 1000
          })
        }
      }else{
        alert(serverResponse['message']);
        swal.fire({
          title: 'Error',
          text:response['message'],
          icon : "error",
          timer : 1000,
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
