import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AddProductComponent } from '../components/add-product/add-product.component';
import { ProductsListComponent } from '../components/products-list/products-list.component';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';

const routes: Routes = [
    { path: '', component: ProductsListComponent },
    { path: 'add', component: AddProductComponent },
    { path: 'products', component: ProductsListComponent },
    { path: 'products/:id', component: ProductDetailsComponent },
    { path: 'update/:id', component: AddProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProductsRoutingModule { }