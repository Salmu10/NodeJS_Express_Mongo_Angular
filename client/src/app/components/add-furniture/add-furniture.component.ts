import { Component, OnInit } from '@angular/core';
import { Furniture } from 'src/app/models/furniture.model';
import { FurnitureService } from 'src/app/services/furniture.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-furniture',
  templateUrl: './add-furniture.component.html',
  styleUrls: ['./add-furniture.component.css']
})

export class AddFurnitureComponent implements OnInit {

  update: Boolean = false;
  new_furniture: Furniture = {
    name: '',
    price: 0,
    description: '',
    owner: ''
  };
  submitted = false;

  constructor(private furniture_service: FurnitureService, private router: Router, private route: ActivatedRoute, private toastrService: ToastrService) { }

  ngOnInit(): void {
    if (this.route.snapshot.params["id"]) {
      this.get_furniture(this.route.snapshot.params["id"]);
      this.update = true;
    }
  }

  create_furniture(): void {
    this.furniture_service.create_furniture(this.new_furniture).subscribe({
      next: data => {
        //console.log(data);
        this.router.navigate(['/furniture']);
        this.toastrService.success("This furniture has been add")
      },
      error: (e) => this.toastrService.error("Can't add this furniture")
    });

  }

  update_furniture(): void {
    this.furniture_service.update_furniture(this.new_furniture, this.route.snapshot.params["id"]).subscribe({
      next: data => {
        this.router.navigate(['/furniture']);
        this.toastrService.success("This furniture has been updated")
      },
      error: (e) => this.toastrService.error("Can't update this furniture")
    });
  }

  get_furniture(id: String): void {
    this.furniture_service.get_furniture(id).subscribe({
      next: data => {
        this.new_furniture = data;
      },
      error: e => {
        console.error(e);
      }
    });
  }

}

