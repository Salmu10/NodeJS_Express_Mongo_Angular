import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxMultiselectModule } from '@ngx-lib/multiselect';

import { CategoriesListComponent } from "./categories-list/categories-list.component";
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselItemsComponent } from './carousel-items/carousel-items.component';
import { FiltersComponent } from './filters/filters.component';
import { SearchComponent } from './search/search.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        InfiniteScrollModule,
        NgxMultiselectModule,
        RouterModule
    ],
    declarations: [
        CategoriesListComponent,
        CarouselItemsComponent,
        CarouselComponent,
        ProductsListComponent,
        ProductDetailsComponent,
        FiltersComponent,
        SearchComponent
    ],
    exports: [
        CategoriesListComponent,
        CarouselItemsComponent,
        CarouselComponent,
        ProductsListComponent,
        ProductDetailsComponent,
        FiltersComponent,
        SearchComponent
    ],
})

export class SharedModule { }