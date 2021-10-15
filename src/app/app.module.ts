import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './views/sidebar/sidebar.component';
import { TasksComponent } from './views/tasks/tasks.component';

// Material UI modules

import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from "@angular/material/table";

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconRegistry } from "@angular/material/icon"

import { MatDialogModule } from "@angular/material/dialog";
import { AddDialogComponent } from './add-dialog/add-dialog.component'

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TasksComponent,
    AddDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent, MatIconRegistry]
})
export class AppModule { }