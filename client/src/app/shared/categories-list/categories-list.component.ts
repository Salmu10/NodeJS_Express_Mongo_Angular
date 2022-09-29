import { Component, OnInit } from '@angular/core';
import { CategoryService, Category } from '../../core'

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})

export class CategoriesListComponent implements OnInit {

  categories?: Category[];

  constructor(private CategoryService: CategoryService) { }

  ngOnInit(): void {
    this.showCategorys()
  }

  showCategorys() {
    this.CategoryService.all_categories().subscribe((data) => {
      this.categories = data;
    })
  }

}
