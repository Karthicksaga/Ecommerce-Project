import { Component, OnInit } from '@angular/core';
import { GetProductService } from './home-component.component.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {

  constructor(private productService: GetProductService, 
    private router : Router) { }

  Products : any[] = [];
  
   
  ngOnInit(): void {
    this.getAllProducts();
  }
  //swal loading Example 
  //https://stackoverflow.com/questions/43957637/show-loading-alert-with-sweetalert2-without-having-to-interact
  public getAllProducts() {
    swal.fire({
      title: 'Fetching products...',
  });
  swal.showLoading();
    console.log("Home component get all products called");
    this.productService
      .getAllProducts()
      .subscribe(response => {
        swal.close();
        console.log("Response Data : " + response);
        if(response != null){
          
          const serverResponse = response['response'];
          if(serverResponse['success'] ===  true) {
              
              if(serverResponse['data'].length > 0) {
                this.Products = serverResponse['data'];
                swal.fire({
                  title: 'Success',
                  text:serverResponse['message'],
                  icon : "success",
                  timer : 1000
                })
              }
          }else{
            swal.fire({
              title: 'Error',
              text:serverResponse['message'],
              icon : "error",
              timer : 1000
            })
          }

        }else{
          swal.fire({
            title: 'Error',
            text: 'No Products Found',
            icon : "error"
          })
        }
      })
  }

  OnSelectProduct(id: number) {
    this.router.navigate(['product-details/'+id])
  }

}
