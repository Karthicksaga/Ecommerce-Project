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
      
      console.log("Edit Users component Executed Successfully");
      this.userId = this.activeRoute.snapshot.params['id'];
      console.log("User Id "+ this.userId);
       if(this.userId != null){
         this.userService.getUserById(this.userId).subscribe((response) => {
           console.log('Server Response ' + response);
           const serverResponse = response['response']
           if(serverResponse['success'] == true){
             const userObject = serverResponse['data'];
             if(userObject != null){
               this.name = userObject['name'];
               this.fname =  userObject['fname'];
               this.lname = userObject['lname'];
               this.password = userObject['password'];
               this.email = userObject['email'];
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

  ngOnInit(): void {
      
  }

  getUserDetails(){
    
  }
  onUpdateUserDetails(){

    this.userDataObject = {
      name : this.name,
      fname : this.fname,
      lname : this.lname,
      email : this.email,
      phone : this.phone
    }

    console.log(this.userDataObject);
    this.userService.updateUserById(this.id,this.userDataObject)
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
