import { Component, OnInit } from '@angular/core';
import { CategoryService, Category } from '../../core'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})

export class CategoriesListComponent implements OnInit {

  category?: Category[];

  constructor(private CategoryService: CategoryService) { }

  ngOnInit(): void {
    this.showCategorys()
  }

  showCategorys() {
    this.CategoryService.all_categories().subscribe((data) => {
      this.category = data;
    })
  }

}
