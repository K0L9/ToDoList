import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/models/task';
import { DataApiServiceService } from 'src/app/services/data-api-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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

  displayedColumns: string[] = ['id', 'title', 'category', 'date'];
  // @ts-ignore
  dataSource: MatTableDataSource<Task>;

  tasks: Task[] = [];

  myControl = new FormControl();
  option: string[] = ['One', 'Two', 'Three'];
  //@ts-ignore
  filteredOptions: Observable<string[]>;

  constructor(private apiService: DataApiServiceService) { }

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
  private refreshTable() {

    this.dataSource.data = this.tasks;
    this.addTableObjects();


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
      }
    };

  }
  private addTableObjects() {
    this.dataSource.sort = this.sort;
  }
}