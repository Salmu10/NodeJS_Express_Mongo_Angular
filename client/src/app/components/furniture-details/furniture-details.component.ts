import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Furniture } from 'src/app/models/furniture.model';
import { FurnitureService } from 'src/app/services/furniture.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-furniture-details',
  templateUrl: './furniture-details.component.html',
  styleUrls: ['./furniture-details.component.css']
})

export class FurnitureDetailsComponent implements OnInit {

  message = '';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private furnitureService: FurnitureService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      console.log("no view")
    }
  }

  @Input() viewMode = false;

  @Input() currentFurniture: Furniture = {
    name: "",
    price: 0,
    description: "",
    owner: "",
  }

  deleteFurniture(id: String): void {
    this.furnitureService.delete_furniture(id).subscribe({
      next: data => {
        console.log(data);
        window.location.reload();
        this.toastrService.success("This furniture has been removed")
      },
      error: (e) => this.toastrService.error("Can't remove this furniture")
    });
  }

  updateFurniture(): void {}

}
