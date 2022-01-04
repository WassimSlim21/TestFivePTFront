import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/core/service/api.service';
import { RegisterComponent } from 'src/app/popup/register/register.component';
import { MatDialog } from '@angular/material';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private credential = {userName: '', password : ''};
  userName: string;
  password: string;
  account: any;
  constructor( private authService: ApiService, private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar)  { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/dashboard']);
    }
  }

  login(): void {
    console.log("m heeeeeeeeeeeeeeeeeeeeeeere")
    this.authService.sendCredential(this.userName, this.password).subscribe(
     data => {
      localStorage.setItem('account', JSON.stringify(data.user));
       localStorage.setItem('token', data.token);
       this.snackBar.open('Connected Sucessfully ');
         this.router.navigate(['/dashboard']);
   },
      error => {
       console.log(error);
  this.snackBar.open('Failed to connect');
      },



   );


  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      disableClose: false,
      height: 'auto',
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }


}
