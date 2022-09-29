import { Component, OnInit } from '@angular/core';
import { ProductService, Product, CategoryService, Category } from '../../core'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})

export class ProductsListComponent implements OnInit {

  products$?: Product[];
  id_category: String = "";
  categorys?: Category[];

  constructor(private ProductService: ProductService, private CategoryService: CategoryService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_category = this.ActivatedRoute.snapshot.paramMap.get('slug') || "";
    this.get_product();
  }

  get_product(): void {
    this.ProductService.products = [];
    if (this.ProductService.products.length == 0) {
      if (this.id_category !== "") {
        this.CategoryService.get_category(this.id_category).subscribe({
          next: data => {
            this.ProductService.products = data.products
          },
          error: e => {
            console.error(e)
          }
        });
      } else {
        this.ProductService.all_products().subscribe({
          next: data => this.ProductService.products = data,
          error: e => console.error(e)
        });
      }
    }
    this.ProductService.products$.subscribe({
      next: data => this.products$ = data,
      error: e => console.error(e)
    });
  }

}
