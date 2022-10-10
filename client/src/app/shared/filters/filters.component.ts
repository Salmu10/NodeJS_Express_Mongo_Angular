import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category, Filters } from '../../core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  name: string;
  price_min: number | undefined;
  price_max: number | undefined;
  routeFilters: string | null;
  filters: Filters;
  filterForm: FormGroup;

  @Input() listCategories: Category[];
  @Output() filterEvent: EventEmitter<Filters> = new EventEmitter();

  constructor(
    private ActivatedRoute: ActivatedRoute, 
    private fb: FormBuilder,
    private location: Location
  ) {
    this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
  }

  public price_calc(price_min: number, price_max: number) {
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

  /**
   * Esta función evita un envío e innecesarios envíos de datos al servidor.
   * Cuando el usuario deja de escribir durante un mínimo espacio de tiempo, la función permite enviar los datos de búsqueda.
   * @param filters
   */

  private checkTime(filters: Filters) {
    setTimeout(() => {
      if (filters === this.filters){
        this.location.replaceState('/shop/' + btoa(JSON.stringify(this.filters)));
        this.filterEvent.emit(this.filters);
      }
    }, 200);
  }

  public changeEvent(value: any) {
    this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
    if (this.routeFilters) {
      console.log("1");
      this.filters = new Filters();
      this.filters = JSON.parse(atob(this.routeFilters));
    } else {
      console.log("2");
      this.filters = new Filters();
    }

    this.price_calc(value.price_min, value.price_max);

    if (value.name) {
      this.filters.name = value.name;
    }

    this.filters.price_min = this.price_min ? this.price_min : undefined;
    this.filters.price_max = this.price_max == 0 || this.price_max == null ? undefined : this.price_max;
    this.filters.offset = 0;
    this.checkTime(this.filters);
  }
}