import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../products.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  //create array of ProductList
  products: ProductModel[] = [
    new ProductModel(1, 'Product 1', 100, 'https://via.placeholder.com/150', 'Test Product'),
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
