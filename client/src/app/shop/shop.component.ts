import { Component, OnInit } from '@angular/core';
import { Product } from '../core/model/product.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  // products: ProductModel[]  = [new Product(1, "Book", 80, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb_1V66OBAOa9ajifl02qesb3VT2NwVKvmrijAamaYUAtueSfjQeyPGHXefZcewOROGeM&usqp=CAU", "Test Product"),
  // new ProductModel(1, "Book", 80, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb_1V66OBAOa9ajifl02qesb3VT2NwVKvmrijAamaYUAtueSfjQeyPGHXefZcewOROGeM&usqp=CAU", "Test Product")];
  constructor() { }

  ngOnInit(): void {
  }

}
