import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { CommonService } from 'src/app/core/services/common.service';
import { Subscription } from 'rxjs';
import SweetAlert from 'sweetalert2/dist/sweetalert2.js'



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
        console.log(response);
        let data = response.data;
        if(data.success){
          this.isAdminFlag = data.isAdmin;
          this.commonService.setValue(true);
          this.commonService.setToken(data.token);
          console.log(data.userName);
          this.commonService.setUserName(data.userName);
          this.commonService.setUserLoginStatus(true);
          this.router.navigate(['/home']);
        }
    },
    (error) => {
      console.log(error.error.data.message);
    })
  }
}
