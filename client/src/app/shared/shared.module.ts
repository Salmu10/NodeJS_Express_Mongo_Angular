import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ListCategoryComponent } from "./list-category/list-category.component";
import { ProductsListComponent } from './products-list/products-list.component';
import { CardProductsComponent } from './card-products/card-products.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselItemsComponent } from './carousel-items/carousel-items.component';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule
    ],
    declarations: [
        ListCategoryComponent,
        ProductsListComponent,
        CardProductsComponent,
        CarouselComponent,
        CarouselItemsComponent,
    ],
    exports: [
        ListCategoryComponent,
        ProductsListComponent,
        CardProductsComponent,
        CarouselComponent,
        CarouselItemsComponent
    ],
})
export class SharedModule { }