import { Component, OnInit, Input } from '@angular/core';
import { ProductService, Product, Filters, CategoryService, Category } from '../../core'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})

export class ProductsListComponent implements OnInit {

  listProducts: Product[] = [];
  listCategories: Category[] = [];
  slug_Category: string | null;
  routeFilters: string | null;

  offset: number = 0;
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
    private ActivatedRoute: ActivatedRoute,
    private Location: Location,
  ) {
  }
  
  ngOnInit(): void {
    this.slug_Category = this.ActivatedRoute.snapshot.paramMap.get('slug');
    this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
    this.get_products();
  }

  getRequestParams(offset: number, limit: number): any {
    let params: any = {};

    params[`offset`] = offset;
    params[`limit`] = limit;

    return params;
  }

  get_products(): void {
    this.getListForCategory();
    const params = this.getRequestParams(this.offset, this.limit);
    if (this.slug_Category !== null) {
      this.ProductService.get_products_from_category(this.slug_Category, params).subscribe({
        next: data => {
          if (this.slug_Category) {
            this.filters.category = this.slug_Category;
          }
          this.listProducts = data.products;
          this.totalPages = Array.from(new Array(Math.ceil(data.product_count/this.limit)), (val, index) => index + 1);
        },
        error: e => console.error(e)
      });
    } else if (this.routeFilters !== null) {
      this.refresRouteFilter();
      this.get_list_filtered(this.filters);
    } else {
      this.get_list_filtered(this.filters);
    }
  }

  get_list_filtered(filters: Filters) {
    this.filters = filters;
    this.ProductService.get_products(filters).subscribe(
      (data) => {
        this.listProducts = data.products;
        this.totalPages = Array.from(new Array(Math.ceil(data.product_count/this.limit)), (val, index) => index + 1);
        },
      (error) => {
        console.log(error);
      }
    );
  }

  getListForCategory() {
    this.CategoryService.all_categories().subscribe(
      (data) => {
        this.listCategories = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  refresRouteFilter() {
    this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
    if(typeof(this.routeFilters) == "string" ){
      this.filters = JSON.parse(atob(this.routeFilters));
    }else{
      this.filters = new Filters();
    }
  }

  setPageTo(pageNumber: number) {

    this.currentPage = pageNumber;

    if (typeof this.routeFilters === 'string') {
      this.refresRouteFilter();
    }

    if (this.limit) {
      this.filters.limit = this.limit;
      this.filters.offset = this.limit * (this.currentPage - 1);
    }

    this.Location.replaceState('/shop/' + btoa(JSON.stringify(this.filters)));
    this.get_list_filtered(this.filters);
  }
}
