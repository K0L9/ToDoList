import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { DataApiServiceService } from 'src/app/services/data-api-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  categories: Category[] = [];
  categorySelected?: Category;

  constructor(private apiService: DataApiServiceService) { }

  ngOnInit(): void {
    this.categories = this.apiService.getCategories();
  }

  sortByCategory(category: Category): void {
    this.categorySelected = category;
    this.apiService.sortTasksByCategory(category);
  }
}
