import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { CategoryService } from '../../core/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  categoryList: any[] = [];
  id: any;
  categoryId: String;
  name: String;
  description: String;
  imageUrl: String;
  price: String;
  quantity: String;
  updateProductDetails: any;

  constructor(private productService: ProductService, 
    private categoryService: CategoryService, private router: Router, 
    private activeRoute: ActivatedRoute) {

      this.id = this.activeRoute.snapshot.params['id'];

      this.productService.getProductById(this.id).subscribe((response) => {
        console.log('Server Response ' + response);
        const serverResponse = response['response']
        if(serverResponse['success'] == true){
          this.name = serverResponse['data'].name
          this.description = serverResponse['data'].description
          this.imageUrl = serverResponse['data'].imageUrl
          this.price = serverResponse['data'].price
          this.quantity = serverResponse['data'].quantity
          this.categoryId = serverResponse['data'].categoryId

          swal.fire({
            title: 'Success',
            text:serverResponse['message'],
            icon : "success",
            timer : 2000
          })
        }else{

          swal.fire({
            title: 'Error',
            text:serverResponse['message'],
            icon : "error",
            timer : 2000
          })
        }
     })
    }

  ngOnInit(): void {

    this.getCategories();
  }


  onUpdateProductDetails(){

    this.updateProductDetails = {
      name : this.name,
      description : this.description,
      price : this.price,
      imageUrl : this.imageUrl,
      categoryId : this.categoryId,
      quantity : this.quantity
    }

    this.productService.updateProduct(this.updateProductDetails)
    .subscribe((response) => {
      const serverResponse = response['response']
      if(serverResponse['success'] === true){
        swal.fire({
          title: 'Success',
          text:serverResponse['message'],
          icon : "success",
          timer : 2000
        })
      }else{
        swal.fire({
          title: 'Error',
          text: serverResponse['message'],
          icon : "error",
          timer : 2000
      })

    }
  })
}
  getCategories(){

    this.categoryService.getAllCategory().subscribe((response) => {
      console.log("Server Response :" + response);
      const serverResponse = response['response']

      if(serverResponse['success'] === true){
        this.categoryList = serverResponse['data']
        console.log(this.categoryList);
        this.categoryId = this.categoryList[0].categoryId

        swal.fire({
          title: 'Success',
          text:serverResponse['message'],
          icon : "success",
          timer : 200
        })
      }else{
        swal.fire({
          title: 'Error',
          text:serverResponse['message'],
          icon : "error",
        });
      }
    })
    

  }
}
