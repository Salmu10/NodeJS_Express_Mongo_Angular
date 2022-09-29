import { Component, OnInit } from '@angular/core';
import { CategoryService, Category } from '../../core'

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})

export class CarouselComponent implements OnInit {

  picture_carousel: Category[] = [];

  constructor(private carousel_service: CategoryService) { }

  ngOnInit(): void {
    this.showCategorys();
  }

  showCategorys() {
    this.carousel_service.getCarousel().subscribe((data) => {
      this.picture_carousel = data;
    })
  }
}