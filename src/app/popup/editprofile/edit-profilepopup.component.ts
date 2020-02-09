import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
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
  updateForm: FormGroup;
  submitted = false;
  // isShow = true;
  // toggleDisplay() {
  //   this.isShow = !this.isShow;
  // }


  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditProfilepopupComponent>, private accountService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private accountNotifyChangeService: AccountNotifyChangeService,
    private formBuilder: FormBuilder) {
    }




  ngOnInit() {


    this.updateForm = this.formBuilder.group({
      userName: [JSON.parse(localStorage.getItem('account')).userName, Validators.required],

      email: [JSON.parse(localStorage.getItem('account')).email, [Validators.required, Validators.email]],

  });
    this.updateForm.valueChanges.subscribe(value => {
    console.log('value', value);


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
    if (this.updateForm.invalid) {
      this.snackBar.open('please verify the form');
      return ;

}
    // console.log(this.updateForm.controls.value);
    this.submitted = true;
    const data = this.updateForm.value;




/*
    this.accountService.update(this.updateForm.value).subscribe(
      res => {
        this.snackBar.open('account succefully updated');
        this.accountNotifyChangeService.announceChange();
        this.dialogRef.close();
      }
      ,
      error => {
        console.log(error);
        this.snackBar.open('Failed to update ' + JSON.stringify(error));
      },
      );
      */
    this.accountService.update(this.updateForm.value).subscribe((reponse: any) => { // sends post request to the apiService
      this.snackBar.open(JSON.stringify(reponse.message));
     });

}
onReset() {
 this.dialogRef.close();
}
}



