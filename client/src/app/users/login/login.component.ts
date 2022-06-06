import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  //import the service layer and the Router in the constructor
  constructor(public router:Router, public userService : UserService) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      "loginFormData" : new FormGroup({
        "username" : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
        "password" : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)])
      })
    })
  }

  
  onSubmit(){
    console.log(this.loginForm);
    let formValue = this.loginForm.value.loginFormData;
    this.userService.login(formValue)
    .subscribe((response: any) => {
      console.log(response);
    })
  }
}
