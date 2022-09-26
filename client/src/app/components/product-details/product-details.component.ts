import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {

  message = '';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      console.log("no view")
    }
  }

  @Input() viewMode = false;

  @Input() currentProduct: Product = {
    name: "",
    price: 0,
    description: "",
    owner: "",
  }

  deleteProduct(id: String): void {
    this.productService.delete_product(id).subscribe({
      next: data => {
        console.log(data);
        window.location.reload();
        this.toastrService.success("This product has been removed")
      },
      error: (e) => this.toastrService.error("Can't remove this product")
    });
  }

  updateProduct(): void {}

}
