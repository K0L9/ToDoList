import { Component } from '@angular/core';
import { DataApiServiceService } from "../app/services/data-api-service.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo';

  filter?: string = "";

  constructor(private apiService: DataApiServiceService) { }

  onKey(event: any) {
    this.filter = event.target.value;
    console.log("FILTER: ", this.filter)
    this.apiService.setSearchFilter(this.filter != null ? this.filter : "");
  }
}
