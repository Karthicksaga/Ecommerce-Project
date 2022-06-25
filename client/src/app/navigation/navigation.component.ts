import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';
import {Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private commonService: CommonService, private http: HttpClient,
    private router: Router) { }

  isAdminUserStatus: Subscription;
  userNameSubscription: Subscription;
  userLoggedInSubscription : Subscription;
  customerStatusSubscription : Subscription;
  userName: String;
  isAdminUser: boolean = false;
  userStatus: boolean = false;
  customerStatus :boolean =  false;
  

  ngOnInit(): void {

    this.isAdminUserStatus = this.commonService.getAdminUserStatus().subscribe((data) =>{
      this.isAdminUser = data;
    })

    this.userNameSubscription = this.commonService.getUserName().subscribe((name) =>{
      this.userName = name;
      console.log(this.userName);
    })

    this.userLoggedInSubscription = this.commonService.getUserStatus().subscribe((status) =>{
      this.userStatus = status;
    })

    this.customerStatusSubscription = this.commonService.getCustomerStatus().subscribe((status) => {
      this.customerStatus = status;
    })
  }

  public isAdmin(){
    console.log("One time the function is called");
    console.log("Admin Status : " + this.isAdminUser);
    return this.isAdminUser;
  }

  public isCustomerStatus(){
    console.log("Customer Status : " + this.customerStatus);
    return this.customerStatus;
  }
  public getUserName(){
    console.log(this.userName);
    console.log("Username Function is Called ");
    return this.userName;
  }

  public userLoginStatus(){
    return this.userStatus;
  }


  public logout(){

    swal.fire({
      title: 'Are you sure to logout',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        swal.fire('Logged Out Successfully');
        this.userName = undefined;
        this.userStatus = undefined;
        this.commonService.clearSessionToken();
        this.commonService.clearUserName();
        this.commonService.clearUserStatus();
        this.commonService.clearCustomerStatus();
        this.router.navigate(['/home'])

      } else if (result.isDenied) {
        swal.fire("Stay in the Page")
      }
    })
    
  }
}
