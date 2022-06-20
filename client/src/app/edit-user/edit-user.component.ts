import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userId:String;
  id:String;
  name:String;
  fname:String;
  lname:String;
  email:String;
  password:String;
  phone:String;
  userDataObject:any;

  constructor(private router: Router, 
    private userService : UserService, 
    private activeRoute: ActivatedRoute) { 
    }

  ngOnInit(): void {
  }

  getUserDetails(){
     this.userId = this.activeRoute.snapshot.params['id'];
      if(this.userId != null){
        this.userService.getUserById(this.id).subscribe((response) => {
          console.log('Server Response ' + response);
          const serverResponse = response['response']
          if(serverResponse['success'] == true){
            const userObject = serverResponse['data'];
            if(userObject != null){
              this.name = userObject['name'];
              this.fname =  userObject['fname'];
              this.lname = userObject['email'];
              this.password = userObject['password'];
              this.phone = userObject['phone'];
              this.id = userObject['_id'];

              swal.fire({
                title: 'Success',
                text:serverResponse['message'],
                icon : "success",
                timer : 200
              })

            }else{
              swal.fire({
                title: 'Error',
                text:serverResponse['message'],
                icon : "error",
                timer : 2000
              })
            }
          }else{
            swal.fire({
              title: 'Error',
              text:serverResponse['message'],
              icon : "error",
              timer : 2000
            })
          }
        })
      }

  }
  onUpdateUserDetails(id: String){

    this.userDataObject = {
      name : this.name,
      fname : this.fname,
      lname : this.lname,
      email : this.email,
      password : this.password,
      phone : this.phone
    }

    console.log(this.userDataObject);
    this.userService.updateUserDetails(this.id,this.userDataObject)
    .subscribe(response => {

      const serverResponse = response['response'];
      
      if(serverResponse != null){

        swal.fire({
          'title' : 'Success',
            text : serverResponse['message'],
            icon : 'success',
            timer : 2000
        })
      }else{

        swal.fire({

          title : 'Error',
          text : serverResponse['message'],
          icon : 'warning',
          timer : 2000
        })
      }

    })

  }

}
