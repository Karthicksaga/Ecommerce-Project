import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {

  registerSuccess = false;
  registerFailure = false;
  registerForm: FormGroup;
  failedMessage: string = "";

  constructor(public userService: UserService,private router: Router) {

   }

  ngOnInit(): void {

    this.registerForm = new FormGroup({
      'registerFormData': new FormGroup({
        'uname' : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
        'email' : new FormControl(null, [Validators.required, Validators.email]),
        'password' : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)])
    })
  });
}

  //passing the input as payload and it returns response as Observable
  //flow for the code componentts-> service-> service method-> service method returns 
  onSubmit(){

    const userData = {email : this.registerForm.value.registerFormData.email,
                      password : this.registerForm.value.registerFormData.password, 
                      uname : this.registerForm.value.registerFormData.uname};
    this.userService.register(userData)
    .subscribe((response: any) => {
        console.log(response);
        if(response.success) {
          
          this.registerSuccess = true;
          this.router.navigate(['users/login']);
        }
        else{
          this.registerFailure = true;
          this.failedMessage = response.message;
          this.registerForm.reset();
        }

    });
  }
}
