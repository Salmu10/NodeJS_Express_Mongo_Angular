import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})

export class CategoriesListComponent implements OnInit {

  constructor(private categoryService: CategoryService, private toastrService: ToastrService) { }


  categories?: Category[];
  currentIndex: Number = -1;
  currentCategory: Category = {
    id_cat: "",
    category_name: "",
    image: ""
  };

  ngOnInit(): void {
    this.retrieveCategories();
  }

  set_category(category: Category, i: Number): void {
    this.currentIndex = i;
    this.currentCategory = category;
  }

  retrieveCategories(): void {
    this.categoryService.all_categories()
      .subscribe({
        next: (data) => {
          this.categories = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveCategories();
    this.currentCategory = {};
    this.currentIndex = -1;
  }

  delete_all_category(): void {
    this.categoryService.delete_all_categories().subscribe({
      next: data => {
        this.refreshList();
        this.toastrService.success("All categories has been removed")
      },
      error: (e) => {
        console.log(e);
        this.toastrService.error("Can't remove all categories")
      }
    });
  }

}
