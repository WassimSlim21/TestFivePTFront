import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AccountService } from 'src/app/core/service/account.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-profilepopup',
  templateUrl: './edit-profilepopup.component.html',
  styleUrls: ['./edit-profilepopup.component.scss']
})
export class EditProfilepopupComponent implements OnInit {
  public updateForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditProfilepopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private accountService: AccountService, private formBuilder: FormBuilder,
    ) {

      this.updateForm = formBuilder.group({
        username: new FormControl('', [Validators.minLength(2)]),
        email: new FormControl('', [
          Validators.required,
          Validators.email,
          Validators.minLength(2)
        ]),
        role: new FormControl('', [Validators.minLength(2)]),
        password: new FormControl('', [Validators.minLength(2)]),
        confpassword: new FormControl('', [Validators.minLength(2)])
      });


    }

    checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  const pass = group.get('password').value;
  const confpassword = group.get('confpassword').value;
  return pass === confpassword ? null : { notSame: true}
}
  ngOnInit() {
  }

}
