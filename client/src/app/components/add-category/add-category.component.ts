import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})

export class AddCategoryComponent implements OnInit {

  update: Boolean = false;
  new_category: Category = {
    id_cat: '',
    category_name: '',
    image: ''
  };
  submitted = false;

  constructor(private category_service: CategoryService, private router: Router, private route: ActivatedRoute, private toastrService: ToastrService) { }

  ngOnInit(): void {
    if (this.route.snapshot.params["id"]) {
      this.get_category(this.route.snapshot.params["id"]);
      this.update = true;
    }
  }

  create_category(): void {
    this.category_service.create_category(this.new_category).subscribe({
      next: data => {
        //console.log(data);
        this.router.navigate(['/category']);
        this.toastrService.success("This category has been add")
      },
      error: (e) => this.toastrService.error("Can't add this category")
    });

  }

  update_category(): void {
    this.category_service.update_category(this.new_category, this.route.snapshot.params["id"]).subscribe({
      next: data => {
        this.router.navigate(['/category']);
        this.toastrService.success("This category has been updated")
      },
      error: (e) => this.toastrService.error("Can't update this category")
    });
  }

  get_category(id: String): void {
    this.category_service.get_category(id).subscribe({
      next: data => {
        this.new_category = data;
      },
      error: e => {
        console.error(e);
      }
    });
  }

}

