import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './category-routing';

import { AddCategoryComponent } from '../components/add-category/add-category.component';
import { CategoriesListComponent } from '../components/categories-list/categories-list.component';
import { CategoryDetailsComponent } from '../components/category-details/category-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddCategoryComponent,
    CategoryDetailsComponent,
    CategoriesListComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CategoriesModule { }