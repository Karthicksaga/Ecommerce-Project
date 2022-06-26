import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { ShopComponent } from './shop/shop.component';
import { ProductsComponent } from './products/products.component';
import { ProductCreationComponent } from './products/product-creation/product-creation.component';
import { OrdersComponent } from './orders/orders.component';
import { CartComponent } from './cart/cart.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import {Routes} from '@angular/router';
import { RouterModule } from  '@angular/router'
import { ErrorComponent } from './error/error.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './users/login/login.component';
import { ProfileComponent } from './users/profile/profile.component';
import { ReciptsComponent } from './users/recipts/recipts.component';
import { RegisterComponent } from './users/register/register.component';
import { FormsModule } from '@angular/forms';
import {  ReactiveFormsModule } from '@angular/forms';
import { UserService } from './core/services/user.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Product1Component } from './products/product1/product1.component';
import { Product2Component } from './products/product2/product2.component';
import { Product3Component } from './products/product3/product3.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { ListUserComponent } from './list-user/list-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { Product1Service } from './products/product1/product1.component.service'


//we define all the routes in the main page of the application
// app the routes is followed specific patterns


const appRoutes: Routes = [
  {path : 'home', component: HomeComponentComponent},
  {path :'users/login', component : LoginComponent},
  {path : "users/register", component : RegisterComponent},
  {path : 'login/user/edit-user/:id', component : EditUserComponent},
  {path : 'admin/add-product', component : AddProductComponent},
  {path :'admin', component : AdminComponent,children : [
  {path : 'products', component: ProductsComponent}
  ]},
  {path : 'admin/all-products', component : ProductListComponent},
  {path : 'admin/edit-product/:id', component : EditProductComponent},
  {path : 'product-details/:id', component : ProductDetailsComponent},
  {path : 'admin/users', component: ListUserComponent},
  {path : 'category/Electronics', component: Product1Component},
  {path : 'category/groceries', component : Product2Component},
  {path : 'category/clothes', component : Product3Component},
  {path : 'productNotFound', component : ErrorComponent}, //'}
  {path : 'shop', component : ShopComponent, children: [
  {'path' : 'products' , component: ProductsComponent},
  {'path' : 'products/:id', component: ProductsComponent},]},
  {path : 'errorPage', component : ErrorComponent},
  {path : "**" , redirectTo : '/errorPage'}

];

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ShopComponent,
    ProductsComponent,
    OrdersComponent,
    CartComponent,
    ProductListComponent,
    ProductCreationComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    UsersComponent,
    LoginComponent,
    ProfileComponent,
    ReciptsComponent,
    RegisterComponent,
    Product1Component,
    Product2Component,
    Product3Component,
    HomeComponentComponent,
    ProductDetailsComponent,
    AddProductComponent,
    EditProductComponent,
    ListUserComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService, Product1Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
