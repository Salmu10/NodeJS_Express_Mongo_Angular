import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFurnitureComponent } from '../components/add-furniture/add-furniture.component';
import { FurnituresListComponent } from '../components/furnitures-list/furnitures-list.component';
import { FurnitureDetailsComponent } from '../components/furniture-details/furniture-details.component';

const routes: Routes = [
    { path: '', component: FurnituresListComponent },
    { path: 'add', component: AddFurnitureComponent },
    { path: 'furnitures', component: FurnituresListComponent },
    { path: 'furnitures/:id', component: FurnitureDetailsComponent },
    { path: 'update/:id', component: AddFurnitureComponent }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FurnituresRoutingModule { }