import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/service/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userName: any;
  password: any;
  email: string;
  account: any;
  constructor(private authService: ApiService, private router: Router,   private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/dashboard']);
    }
  }

  register(): void {
    this.authService.register({userName: this.userName,password:this.password}).subscribe(
     data => {
       this.snackBar.open('register Sucessfully ');
         this.router.navigate(['/login']);
   },
      error => {
       console.log(error);
  this.snackBar.open('Failed to connect');
      },



   );


  }

}
