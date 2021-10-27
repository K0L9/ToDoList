import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/models/task';
import { DataApiServiceService } from 'src/app/services/data-api-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';

import { AddDialogComponent } from "src/app/add-dialog/add-dialog.component"

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, AfterViewInit {

  // @ts-ignore
  @ViewChild(MatSort, { static: false }) private sort: MatSort;
  // @ts-ignore
  @ViewChild(MatPaginator, { static: false }) private paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'title', 'category', 'date', 'isCompleted', 'actions'];
  // @ts-ignore
  dataSource: MatTableDataSource<Task>;

  tasks: Task[] = [];

  myControl = new FormControl();
  option: string[] = ['One', 'Two', 'Three'];
  //@ts-ignore
  filteredOptions: Observable<string[]>;

  constructor(private apiService: DataApiServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.apiService.tasks.subscribe(tasks => this.tasks = tasks);
    this.dataSource = new MatTableDataSource();
    this.apiService.tasks.subscribe(tasks => this.dataSource.data = tasks);
    this.refreshTable();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    let values: string[] = [];

    this.dataSource.data.map(x => {
      values.push(x.title);
    })

    this.apiService.setSearchFilter(filterValue);

    return values.filter(option => option.toLowerCase().includes(filterValue));
  }

  switchStatus(task: Task): void {
    task.isCompleted = !task.isCompleted;
  }
  ngAfterViewInit(): void {
    this.addTableObjects();
    this.dataSource.paginator = this.paginator;
  }
  deleteTask(task: Task): void {
    this.apiService.removeTask(task);
  }
  openDialog(): void {
    //@ts-ignore
    let task = new Task();
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '400px',
      data: { task: task }
    });

    //I stayed some comments there

    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined)
        return;
      let task = new Task(this.tasks[this.tasks.length - 1].id + 1, result.title, result.isCompleted, result.category, result.date);
      this.apiService.addTask(task);
    });
  }
  private refreshTable() {

    this.dataSource.data = this.tasks;
    this.addTableObjects();

    console.log(this.tasks);


    // @ts-ignore
    this.dataSource.sortingDataAccessor = (task, colName) => {

      switch (colName) {
        case 'id': {
          return task.id ? task.id : null;
        }
        case 'category': {
          return task.category ? task.category.title : null;
        }
        case 'date': {
          return task.date ? task.date : null;
        }
        case 'title': {
          return task.title;
        }
        case 'isCompleted': {
          return task.isCompleted;
        }
      }
    };

  }
  private addTableObjects() {
    this.dataSource.sort = this.sort;
  }
}