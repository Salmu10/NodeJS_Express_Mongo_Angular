import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { CategoriesListComponent } from "./categories-list/categories-list.component";
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselItemsComponent } from './carousel-items/carousel-items.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        InfiniteScrollModule,
        RouterModule
    ],
    declarations: [
        CategoriesListComponent,
        CarouselItemsComponent,
        CarouselComponent,
        ProductsListComponent,
        ProductDetailsComponent
    ],
    exports: [
        CategoriesListComponent,
        CarouselItemsComponent,
        CarouselComponent,
        ProductsListComponent,
        ProductDetailsComponent
    ],
})

export class SharedModule { }