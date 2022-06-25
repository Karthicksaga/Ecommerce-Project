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
      console.log("Edit Product Component is called");
      console.log("Product Id : " + this.id);
      this.productService.getProductById(this.id).subscribe((response) => {
        console.log('Server Response ' + response);
        const serverResponse = response['response']
        if(serverResponse['success'] == true){
          console.log("Product Fetched Successfully from the database" + serverResponse['data']);
          const responseData = serverResponse['data'][0];
          console.log("Product Fetched Successfully from the database" + responseData);
          
          this.name = responseData['name'];
          console.log(responseData['name']);
          this.description = responseData['description']
          this.imageUrl = responseData['imageUrl']
          this.price = responseData['price']
          this.quantity = responseData['quantity']
          this.categoryId = responseData['categoryId']

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

    this.productService.updateProduct(this.id,this.updateProductDetails)
    .subscribe((response) => {
      const serverResponse = response['response']
      if(serverResponse['success'] === true){
        swal.fire({
          title: 'Success',
          text:serverResponse['message'],
          icon : "success",
          confirmButtonText: 'ProductList'
        }).then((result) => {
          this.router.navigate(['/admin/all-products']);
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
