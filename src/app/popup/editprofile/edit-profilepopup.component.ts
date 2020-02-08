import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from 'src/app/core/service/api.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/core/models/account';
import { AccountNotifyChangeService } from 'src/app/core/service/account-notify-change.service';
@Component({
  selector: 'app-edit-profilepopup',
  templateUrl: './edit-profilepopup.component.html',
  styleUrls: ['./edit-profilepopup.component.scss']
})
export class EditProfilepopupComponent implements OnInit {
  // tslint:disable-next-line: ban-types
  roles: String[] = ['Admin', 'Super Admin'];
  updateForm: FormGroup;
  submitted = false;
  // isShow = true;
  // toggleDisplay() {
  //   this.isShow = !this.isShow;
  // }


  constructor(
    public dialogRef: MatDialogRef<EditProfilepopupComponent>, private accountService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private accountNotifyChangeService: AccountNotifyChangeService,
    private formBuilder: FormBuilder) {
    }




  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      userName: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      oldPassword: ['', [ Validators.minLength(6)]],
      password: ['', [ Validators.minLength(6)]],
      confirmPassword: ['']  }, {
      validator: this.MustMatch('password', 'confirmPassword', 'oldPassword')
  });
  }
  get f() { return this.updateForm.controls; }


  MustMatch(controlName: string, matchingControlName: string, oldmatchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        const oldControl = formGroup.controls[oldmatchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value && control.value !== oldControl.value && matchingControl.value !== oldControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
}
  updateUser() {
    console.log(this.updateForm.controls.value);
    this.submitted = true;
    const data = this.updateForm.value;
    const newAccount = new Account(data.username, data.email, data.role, data.password);
    this.accountService.update(newAccount).subscribe(
      res => {
        this.accountNotifyChangeService.announceChange();
        // this.toastrService.success('Profile updated successfully', 'Profile');
      });
    if (this.updateForm.invalid) {
        return;

  }
}
onReset() {
  this.submitted = false;
  this.updateForm.reset();
}
}



