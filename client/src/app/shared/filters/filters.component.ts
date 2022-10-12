import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category, Product, Filters } from '../../core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})

export class FiltersComponent {
  
  price_max: number | undefined;
  price_min: number | undefined;
  cat_slug: string | null;

  routeFilters: string | null;
  filters: Filters;
  filterForm: FormGroup;

  @Input() listCategories: Category[];
  @Output() filterEvent: EventEmitter<Filters> = new EventEmitter();

  constructor(
    private ActivatedRoute: ActivatedRoute, 
    private Location: Location
  ) {
    this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
  }

  public price_calc(price_min: number | undefined, price_max: number | undefined) {    
    if (typeof price_min == 'number' && typeof price_max == 'number') {
      if(price_min > price_max){
        this.price_min = price_min;
        this.price_max = undefined;
      }else{
        this.price_min = price_min;
        this.price_max = price_max;
      }
    }
  }

  public filter_products() {
    this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
    if (this.routeFilters) {
      this.filters = new Filters();
      this.filters = JSON.parse(atob(this.routeFilters));
      console.log(this.filters);
    } else {
      this.filters = new Filters();
    }

    if (this.cat_slug) {
      this.filters.category = this.cat_slug;
    }

    this.price_calc(this.price_min, this.price_max);
    this.filters.price_min = this.price_min ? this.price_min : undefined;
    this.filters.price_max = this.price_max == 0 || this.price_max == null ? undefined : this.price_max;
    this.filters.offset = 0;

    this.checkTime(this.filters);
  }

  // remove_all() {
  //   this.cat_slug = '';
  //   this.price_min = undefined;
  //   this.price_max = undefined;
  //   this.filter_products();
  // }

  private checkTime(filters: Filters) {
    setTimeout(() => {
      if (filters === this.filters) {
        this.Location.replaceState('/shop/' + btoa(JSON.stringify(this.filters)));
        this.filterEvent.emit(this.filters);
      }
    }, 200);
  }
}