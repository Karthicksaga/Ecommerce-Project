import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { ProductService } from "../../core/services/product.service";
import swal from 'sweetalert2';

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.css']
})
export class ProductCreationComponent implements OnInit {

  constructor( private productService: ProductService) { }
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
}
