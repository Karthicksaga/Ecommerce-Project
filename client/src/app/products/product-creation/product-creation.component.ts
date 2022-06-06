import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { ProductService } from "../../core/services/product.service";

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
          "price" : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
          "imageUrl" : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
          "category" : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)])
        })
      })

  }

  onSubmitProduct(){
    console.log(this.productForm);
    const productData = {
      name : this.productForm.value.productFormData.name,
      description : this.productForm.value.productFormData.description,
      price : this.productForm.value.productFormData.price,
      imageUrl : this.productForm.value.productFormData.imageUrl,
      category : this.productForm.value.productFormData.category,
    }

    this.productService.addProduct(productData)
    .subscribe((response) => {
      console.log(response);
    })
  }



}
