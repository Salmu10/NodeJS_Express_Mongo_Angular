import { Component, OnInit, Input } from '@angular/core';
import { ProductService, Product, Filters, CategoryService, Category } from '../../core'
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
  routeFilters: string = "";

  offset = 0;
  limit: number = 3;
  currentPage: number = 1;
  query: Filters;
  filters = new Filters();
  totalPages: Array<number> = [];

  @Input() set config(filters: Filters) {
    if (filters) {
      this.query = filters;
      this.currentPage = 1;
      this.get_list_filtered(this.query);
      console.log("hola filters");
    }
  }

  constructor(
    private ProductService: ProductService, 
    private CategoryService: CategoryService, 
    private ActivatedRoute: ActivatedRoute
  ) {
  }
  
  ngOnInit(): void {
    this.slug_Category = this.ActivatedRoute.snapshot.paramMap.get('slug') || "";
    this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters') || "";//obtiene la 'id' del link
    this.get_products();
    // this.get_list_paginated();
  }

  get_products(): void {
    this.getListForCategory();
    if (this.slug_Category !== "") {
      this.CategoryService.get_category(this.slug_Category).subscribe({
        next: data => {
          this.listProducts = data.products;
        },
        error: e => console.error(e)
      });
    } else {
      // this.get_list_paginated();
      this.get_list_filtered(this.filters);
    }
  }

  get_list_filtered(filters: Filters) {
    this.filters = filters;
    console.log(filters);
  }

  getListForCategory() {
    this.CategoryService.all_categories().subscribe(
      (data) => {
        this.listCategories = data;
        console.log(this.listCategories);
      },
      (error) => {
        console.log(error);
      }
    );
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
        },
      (error) => {
        console.log(error);
      }
    );
  }

  setPageTo(pageNumber: number) {
    this.currentPage = pageNumber;
    if (this.limit) {
      this.offset = this.limit * (this.currentPage - 1);
    }
    this.get_list_paginated();
  }

}
