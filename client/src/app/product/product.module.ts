import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './product-routing';

import { AddProductComponent } from '../components/add-product/add-product.component';
import { ProductsListComponent } from '../components/products-list/products-list.component';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddProductComponent,
    ProductDetailsComponent,
    ProductsListComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }