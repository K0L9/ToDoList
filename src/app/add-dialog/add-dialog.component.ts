import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from "../models/task"

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataApiServiceService } from 'src/app/services/data-api-service.service';

import { Category } from "../models/category"

export interface DialogData {
  task: Task;
}

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  categories: Observable<string[]>;
  myControl = new FormControl();

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public apiService: DataApiServiceService) {

    this.categories = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    let values: string[] = [];

    this.apiService.getCategories().map(x => {
      values.push(x.title);
    })

    return values.filter(option => option.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  switchStatus() {
    this.data.task.isCompleted = !this.data.task.isCompleted;
  }
}
