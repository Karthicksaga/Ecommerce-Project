import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../core/services/user.service';
import swal from 'sweetalert2'


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {


  userList:any = [];
  constructor(private router: Router,
    private userService: UserService) {           
 }

 ngOnInit() {
    this.getAllUsers();
 }
 getAllUsers(){
  this.userService.getAllUsers().subscribe((response) => {
    console.log('Server Response ' + response);
    const serverResponse = response['response']
    if(serverResponse['success'] == true){
      this.userList = serverResponse['data'];
      swal.fire({
        title: 'Success',
        text:serverResponse['message'],
        icon : "success",
        timer : 2000
      })

    }
    else{
      console.log("Failed to Fetch the Users");
      swal.fire({
        title: 'Error',
        text:serverResponse['message'],
        icon : "error",
        timer : 2000
      })
    }
  })
 }

  onEditUserDetails(id: String){
    this.router.navigate(['/login/dashboard/user/edit_user/'+id])
  }
  
  
  onDeleteUser(id:String){
    this.userService.deleteUserById(id).subscribe((response) => {
      console.log('Server Response ' + response);
      const serverResponse = response['response']
      if(serverResponse['success'] == true){
        this.getAllUsers();
        swal.fire({
          title: 'Success',
          text:serverResponse['message'],
          icon : "success",
          timer : 2000
    })}else{
      console.log('Failed to Delete the User');
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