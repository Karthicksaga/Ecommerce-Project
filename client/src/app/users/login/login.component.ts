import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { CommonService } from 'src/app/core/services/common.service';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isAdminFlag: boolean;
  error:String;
  //import the service layer and the Router in the constructor
  constructor(public router:Router, public userService : UserService, 
    private commonService: CommonService) {} 

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      "loginFormData" : new FormGroup({
        "email" : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
        "password" : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)])
      })
    })
  }

  
  onSubmit(){
    console.log(this.loginForm);
    let formValue = this.loginForm.value.loginFormData;
    this.userService.login(formValue)
    .subscribe((response) => {

       const serverResponse = response["response"];
       if(serverResponse["success"] == true){
        const userData = serverResponse['data'];
        console.log(userData);
        this.commonService.setAdminUserStatus(userData['isAdmin']);
        this.commonService.setCustomerStatus(userData['isAdmin']);
        this.commonService.setToken(userData["token"]);
        this.commonService.setUserName(userData["name"]);
        this.commonService.setUserStatus(true);
        swal.fire({
            title: "Success",
            text : "Logged in Successfully",
            icon: "success",
            confirmButtonText: "HomePage"
            
          }).then((result) => {

            this.router.navigate(['/home']);
          })
       }else{
            swal.fire({
              title : "Error",
              text : "Invalid Credentials",
              icon: "error"
            })
       }

    },
    (error) => {
      console.log(error);
    })
  }
}
