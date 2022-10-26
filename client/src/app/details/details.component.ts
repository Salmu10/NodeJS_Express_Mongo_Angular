import { Component, OnInit, Input } from '@angular/core';
import { ProductService, Product } from '../core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgControlStatusGroup } from '@angular/forms';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {

    @Input() product?: Product;

    constructor(
        private ProductService: ProductService,
        private ActivatedRoute: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        console.log(this.ActivatedRoute.snapshot.paramMap.get('slug'))
        this.get_product(this.ActivatedRoute.snapshot.paramMap.get('slug'));
    }

    get_product(slug: any): void {
        if (slug) {
            this.ProductService.get_product(slug).subscribe({
                next: (data) => {
                    console.log(data);
                    this.product = data;
                },
                error: (e) =>  {console.error(e)}
            });
        } else {
        }
    }

}