import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FurnituresRoutingModule } from './furniture-routing';

import { AddFurnitureComponent } from '../components/add-furniture/add-furniture.component';
import { FurnituresListComponent } from '../components/furnitures-list/furnitures-list.component';
import { FurnitureDetailsComponent } from '../components/furniture-details/furniture-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddFurnitureComponent,
    FurnitureDetailsComponent,
    FurnituresListComponent
  ],
  imports: [
    CommonModule,
    FurnituresRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FurnituresModule { }