import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FnParam } from '@angular/compiler/src/output/output_ast';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  invalid = false;
  constructor(private apiService: APIService) {
    this.registerForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, Validators.required),
      cpassword: new FormControl(null, [Validators.required])
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
    console.log(JSON.stringify(this.registerForm.value));
    this.apiService.register(this.registerForm.value).subscribe((reponse) => {
      console.log(reponse);
    });
  }

}
