import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-tag-details',
  templateUrl: './tag-details.component.html',
  styleUrls: ['./tag-details.component.scss']
})
export class TagDetailsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TagDetailsComponent>) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
