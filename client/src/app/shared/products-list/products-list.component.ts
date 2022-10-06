import { Component, OnInit } from '@angular/core';
import { ProductService, Product, CategoryService, Category } from '../../core'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})

export class ProductsListComponent implements OnInit {

  listProducts: Product[] = [];
  listCategories: Category[] = [];
  slug_Category: String = "";

  offset = 0;
  limit: number = 2;
  currentPage: number = 1;
  totalPages: Array<number> = [];

  constructor(
    private ProductService: ProductService, 
    private CategoryService: CategoryService, 
    private ActivatedRoute: ActivatedRoute
  ) {
  }
  
  ngOnInit(): void {
    this.slug_Category = this.ActivatedRoute.snapshot.paramMap.get('slug') || "";
    // this.get_products();
    this.get_list_paginated();
  }

  get_products(): void {
    if (this.slug_Category !== "") {
      this.CategoryService.get_category(this.slug_Category).subscribe({
        next: data => this.listProducts = data.products,
        error: e => console.error(e)
      });
    } else {
      this.ProductService.all_products().subscribe({
        next: data => this.listProducts = data,
        error: e => console.error(e)
      });
    }
  }

  getRequestParams(offset: number, limit: number): any {
    let params: any = {};

    params[`offset`] = offset;
    params[`limit`] = limit;

    return params;
  }

  get_list_paginated() {
    const params = this.getRequestParams(this.offset, this.limit);
    this.ProductService.get_products(params).subscribe(
      (data) => {
        this.listProducts = data.products;
        this.totalPages = Array.from(new Array(Math.ceil(data.product_count/this.limit)), (val, index) => index + 1);
        console.log(this.listProducts);
        },
      (error) => {
        console.log(error);
      }
    );
  }

}
