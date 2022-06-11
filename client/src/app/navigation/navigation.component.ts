import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private commonService: CommonService) { }

  isLoggedUser: Subscription;
  userNameSubscription: Subscription;
  userLoggedInSubscription : Subscription;
  userName: String;
  isUser: boolean;
  userStatus: boolean;
  

  ngOnInit(): void {

    this.isLoggedUser = this.commonService.getValue().subscribe((data) =>{
      this.isUser = data;
    })

    this.userNameSubscription = this.commonService.getUserName().subscribe((name) =>{
      this.userName = name;
      console.log(this.userName);
    })

    this.userLoggedInSubscription = this.commonService.getUserLoginStatus().subscribe((status) =>{
      this.userStatus = status;
    })
  }

  isUserLoggedIn(){
    return this.isUser;
  }

  public getUserName(){
    console.log(this.userName);
    return this.userName;
  }

  public userLoginStatus(){
    return this.userStatus;
  }
}
