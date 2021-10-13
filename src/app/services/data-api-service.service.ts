import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Task } from '../models/task';
import { SeedData } from '../data/SeedData';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DataApiServiceService {
  private _searchFilter: string = "";

  tasks = new BehaviorSubject<Task[]>(SeedData.tasks);
  searchFilter = new BehaviorSubject<string>(this._searchFilter);

  currentTasks: Task[] = SeedData.tasks;

  constructor() { }

  getCategories(): Category[] {
    return SeedData.categories;
  }

  getTasks(): void {
    this.tasks.next(SeedData.tasks);
  }

  getSearchFilter(): void {
    return this.searchFilter.next(this._searchFilter);
  }

  setSearchFilter(searchFilter: string): void {
    const sortedTasks = SeedData.tasks.filter(task => task.title.toLowerCase().includes(searchFilter));
    this.tasks.next(sortedTasks);
  }

  sortTasksByCategory(category: Category): void {
    const sortedTasks = SeedData.tasks.filter(task => task.category == category);
    this.tasks.next(sortedTasks);
  }
}
