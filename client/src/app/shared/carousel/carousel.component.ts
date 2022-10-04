import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../core'

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})

export class CarouselComponent implements OnInit {

  @Input() category: Category[] = [];
  @Input() indicators = true;
  @Input() controls = true;
  @Input() autoSlide = false;
  @Input() slideInterval = 5000;

  selectIndex = 0;

  ngOnInit(): void {
    if (this.autoSlide) {
      this.autoSlideImages();
    }
  }

  autoSlideImages(): void {
    setInterval(()=>{
      this.Next();
    }, this.slideInterval);
  }

  selectImage(index: number): void {
    this.selectIndex = index;
  }

  Prev(): void {
    if (this.selectIndex === 0) {
      this.selectIndex = this.category.length - 1;
    } else {
      this.selectIndex--;
    }
  }

  Next(): void {
    if (this.selectIndex === this.category.length - 1) {
      this.selectIndex = 0;
    } else {
      this.selectIndex++;
    }
  }
}