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


//we define all the routes in the main page of the application
// app the routes is followed specific patterns


const appRoutes: Routes = [
  {path : 'home', component: ShopComponent},
  {path :'users/login', component : LoginComponent},
  {path : "users/register", component : RegisterComponent},
  {path : 'admin/add-product', component : ProductCreationComponent},
  {path :'admin', component : AdminComponent,children : [
  {path : 'products', component: ProductsComponent}
  ]},
  {path : 'shop', component : ShopComponent, children: [
    {'path' : 'products' , component: ProductsComponent},
    {'path' : 'products/:id', component: ProductsComponent}]},
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
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }