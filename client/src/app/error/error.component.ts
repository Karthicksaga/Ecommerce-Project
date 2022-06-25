import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.goBack();
  }

  goBack(){

    swal.fire({
      title: 'page not found',
      text: 'the page you are looking for does not exist',
      icon: 'error',
      confirmButtonText: 'go back'
    }).then((result) => {
        console.log("Result" + result);
        this.router.navigate(['/home']);
    })
  }

}
