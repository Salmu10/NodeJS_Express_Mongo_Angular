import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})

export class CategoryDetailsComponent implements OnInit {

  message = '';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      console.log("no view")
    }
  }

  @Input() viewMode = false;

  @Input() currentCategory: Category = {
    id_cat: '',
    category_name: "",
    image: '0'
  }

  deleteCategory(id: String): void {
    this.categoryService.delete_category(id).subscribe({
      next: data => {
        console.log(data);
        window.location.reload();
        this.toastrService.success("This category has been removed")
      },
      error: (e) => this.toastrService.error("Can't remove this category")
    });
  }

  updateCategory(): void {}

}
