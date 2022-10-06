import { Component, OnInit } from '@angular/core';
import { CategoryService, Category } from '../../core'

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})

export class CategoriesListComponent implements OnInit {

  categories: Category[] = [];
  offset = 0;

  constructor(private CategoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
    // this.categories_list();
  }

  // categories_list() {
  //   this.CategoryService.all_categories().subscribe((data) => {
  //     this.categories = data;
  //   })
  // }

  getRequestParams(offset: number, limit: number): any {
    let params: any = {};

    params[`offset`] = offset;
    params[`limit`] = limit;

    return params;
  }

  getCategories() {
    const params = this.getRequestParams(this.offset, 3);

    this.CategoryService.get_categories(params).subscribe(
      (data) => {
        console.log(data);
        this.categories = this.categories.concat(data);
        this.offset = this.offset + 3;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  scroll() {
    this.getCategories();
  }

}
