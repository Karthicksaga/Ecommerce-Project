import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

    categoryList = []
    categoryId = ''
    name: String
    price: String
    description: string
    imageUrl: string
    quantity: String
    productData: any;

  
    constructor(private categoryService: CategoryService, private productService: ProductService) { 

    }
    
    ngOnInit() {
       this.getCategories();
     }

     onSubmitProduct(){
      this.productData = {
        name : this.name,
        description : this.description,
        price : this.price,
        imageUrl : this.imageUrl,
        categoryId : this.categoryId,
        quantity : this.quantity
      }
      this.productService.addProduct(this.productData)
     .subscribe((response) => {
      const serverResponse = response['response'];
      if(serverResponse['success'] === true){
        swal.fire({
          title: 'Success',
          text:serverResponse['message'],
          icon : "info"
        })
    }else{
      swal.fire({
        title: 'Error',
        text:serverResponse['message'],
        icon : "error"
      })
    }
  })
}

    public getCategories(){

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
