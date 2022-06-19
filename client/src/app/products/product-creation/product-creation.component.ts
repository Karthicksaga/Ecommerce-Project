import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { ProductService } from "../../core/services/product.service";
import { CategoryService } from "../../core/services/category.service";
import swal from 'sweetalert2';

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.css']
})

//Form Dropdown Creation Example 
//https://stackoverflow.com/questions/42908475/how-to-populate-a-dropdown-list-default-value-from-api-in-angular2-model-based-f
export class ProductCreationComponent implements OnInit {

  categoryId = '';
  categoryList = [];
  constructor( private productService: ProductService,
                private categoryService : CategoryService) { }
  productForm : FormGroup;

  ngOnInit(): void {

      this.productForm = new FormGroup({
        "productFormData" : new FormGroup({
          "name" : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
          "description" : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
          "imageUrl" : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
          "categoryId" : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
          "price" : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
          "quantity" : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)])
        })
      })

      this.getCategories();
  }

  onSubmitProduct(){
    console.log(this.productForm);
    const productData = {
      name : this.productForm.value.productFormData.value.name,
      description : this.productForm.value.productFormData.value.description,
      price : this.productForm.value.productFormData.value.price,
      imageUrl : this.productForm.value.productFormData.value.imageUrl,
      categoryId : this.productForm.value.productFormData.value.categoryId,
      quantity : this.productForm.value.productFormData.value.quantity
    }
    console.log(productData);
    this.productService.addProduct(productData)
    .subscribe((response) => {
      if(response['success'] === true){
        swal.fire({
          title: 'Success',
          text:response['message'],
          icon : "info"
        })
    }else{
      swal.fire({
        title: 'Error',
        text:response['message'],
        icon : "error"
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
