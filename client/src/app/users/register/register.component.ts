import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import swal from 'sweetalert2';

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
  isAdmin = false

  constructor(public userService: UserService,private router: Router) {

   }

  ngOnInit(): void {

    this.registerForm = new FormGroup({
      'registerFormData': new FormGroup({
        'name' : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
        'fname' : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
        'lname' : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
        'phone' : new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
        'email' : new FormControl(null, [Validators.required, Validators.email]),
        'password' : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)])
    })
  });
}

  //passing the input as payload and it returns response as Observable
  //flow for the code componentts-> service-> service method-> service method returns 
  onSubmit(){

    const userData = {
                      name : this.registerForm.value.registerFormData.name,
                      fname : this.registerForm.value.registerFormData.fname,
                      lname : this.registerForm.value.registerFormData.lname,
                      phone : Number(this.registerForm.value.registerFormData.phone),
                      email : this.registerForm.value.registerFormData.email,
                      password : this.registerForm.value.registerFormData.password, 
                      isAdmin : this.isAdmin
                      };
    this.userService.register(userData)
    .subscribe((response: any) => {
        console.log(response);
        const serverResponse = response['response'];
        if(serverResponse["success"] == true) {
          swal.fire({
            title: 'success',
            text: serverResponse['message'],
            icon: 'success',
            timer : 2000
          })
          this.registerSuccess = true;
          this.router.navigate(['users/login']);

        }
        else{
          swal.fire({
            title: 'Error',
            text: serverResponse['message'],
            icon: 'error',
            timer : 2000
          })

          this.registerFailure = true;
          this.failedMessage = serverResponse["message"];
          this.registerForm.reset();
        }

    },(error: any) =>{
      console.log(error);
    });
  }
}
