import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})

export class CardProductComponent implements OnInit {

    @Input() product: Product = {} as Product;
    @Output() deleteProfileId = new EventEmitter<String>();

    images: String;

    constructor(
        private Router: Router,
        private ProductService: ProductService
    ) { }

    ngOnInit(): void {  
        if(typeof this.product.images !== "undefined"){
          this.images = this.product.images[0];
        }
    }
    
    onToggleFavorite(favorited: boolean) {
        console.log(favorited);
        // this.product.favorited = favorited;
        // if (favorited) {
        //   if (typeof this.product.favorites === 'number') {
        //     this.product.favorites++;
        //   }
        // } else {
        //   if (typeof this.product.favorites === 'number') {
        //     this.product.favorites--;
        //   }
        // }
    }

}