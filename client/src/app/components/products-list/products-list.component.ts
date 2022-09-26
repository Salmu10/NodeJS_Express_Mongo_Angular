import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})

export class ProductsListComponent implements OnInit {

  constructor(private productService: ProductService, private toastrService: ToastrService) { }


  products?: Product[];
  currentIndex: Number = -1;
  currentProduct: Product = {
    name: "",
    price: 0,
    description: "",
    category: "",
    owner: ""
  };

  ngOnInit(): void {
    this.retrieveProducts();
  }

  set_product(product: Product, i: Number): void {
    this.currentIndex = i;
    this.currentProduct = product;
  }

  retrieveProducts(): void {
    this.productService.all_products()
      .subscribe({
        next: (data) => {
          this.products = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveProducts();
    this.currentProduct = {};
    this.currentIndex = -1;
  }

  delete_all_product(): void {
    this.productService.delete_all_products().subscribe({
      next: data => {
        this.refreshList();
        this.toastrService.success("All products has been removed")
      },
      error: (e) => this.toastrService.error("Can't remove all products")
    });
  }

}
