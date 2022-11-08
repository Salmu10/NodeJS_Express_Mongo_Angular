import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product, UserService, ProductService } from 'src/app/core';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css']
})
export class FavoriteButtonComponent implements OnInit {

  @Input() product: Product = {} as Product;
  @Output() toggle = new EventEmitter<boolean>();

  isSubmitting = false;
  isLoged: Boolean = false;

  product_slug: String;

  constructor(
    private UserService: UserService,
    private ProductService: ProductService,
    private Router: Router,
    private ToastrService: ToastrService
  ) { }

  ngOnInit(): void { }

  toggleFavorite() {
    this.isSubmitting = true;
    this.UserService.isAuthenticated.subscribe({
        next: data => this.isLoged = data,
        error: error => console.error(error)
    });

    if (!this.isLoged) {
        this.ToastrService.error('You must be loged. Redirecting to the login page');
        setTimeout(() => { this.Router.navigate(['/auth/login']); }, 600);
    }
    
    if (!this.product.favorited) {
      this.ProductService.favorite(this.product.slug as String).subscribe({
        next: data => {
          console.log(data);
            this.product.favorited = true;
            this.isSubmitting = false;
            this.toggle.emit(true);
        },
        error: error => console.error(error)
      });
    } else {
      this.ProductService.unfavorite(this.product.slug as String).subscribe({
        next: data => {
          console.log(data);
            this.product.favorited = false;
            this.isSubmitting = false;
            this.toggle.emit(false);
        },
        error: error => console.error(error)
      });
    }
  }
}