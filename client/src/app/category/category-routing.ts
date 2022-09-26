import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCategoryComponent } from '../components/add-category/add-category.component';
import { CategoriesListComponent } from '../components/categories-list/categories-list.component';
import { CategoryDetailsComponent } from '../components/category-details/category-details.component';

const routes: Routes = [
    { path: '', component: CategoriesListComponent },
    { path: 'add', component: AddCategoryComponent },
    { path: 'categories', component: CategoriesListComponent },
    { path: 'categories/:id', component: CategoryDetailsComponent },
    { path: 'update/:id', component: AddCategoryComponent }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CategoriesRoutingModule { }