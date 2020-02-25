import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/service/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  invalid = false; // custom validator for password comfirmation
  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {
    this.registerForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, Validators.required),
      cpassword: new FormControl(null, [Validators.required]),
      role: new FormControl(null, Validators.required)
    });
}


  passwordConfirming(c: any) {
    if (c.password !== c.cpassword) {
      this.invalid = true;
    } else {
      this.invalid = false;
    }
  }

  ngOnInit() {
    this.registerForm.valueChanges.subscribe(value => {
      console.log('value', value);
      this.passwordConfirming(value);
      console.log('invalid', this.invalid);

    });

  }




  onClickSubmit() {

    if (this.registerForm.invalid){
      this.snackBar.open('please verify the form');
    } else
    if (this.invalid) {
      this.snackBar.open('recomfirm your password');

    } else {
    console.log(JSON.stringify(this.registerForm.value));
    this.apiService.register(this.registerForm.value).subscribe((reponse: any) => { // sends post request to the apiService
     this.snackBar.open(JSON.stringify(reponse.msg));
     this.registerForm.reset();

    });
  }
  }

}