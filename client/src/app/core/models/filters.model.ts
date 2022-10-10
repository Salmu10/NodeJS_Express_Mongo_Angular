export class Filters {
    limit?: number;
    offset?: number;
    name?: string;
    price_min?: number;
    price_max?: number;
    category?: string;
    
    constructor(
      limit?: number,
      offset?: number,
      name?: string,
      price_min?: number,
      price_max?: number,
      category?: string,
    ) {
      this.limit = limit || 3;
      this.offset = offset || 0;
      this.name = name;
      this.price_min = price_min;
      this.price_max = price_max;
      this.category = category;
    }
  
    public length(): number {
      let count: number = 0;
      if (this.name) count++;
      if (this.price_min) count++;
      if (this.price_max) count++;
      if (this.category) count++;
      console.log(count);
      console.log(this.name);
      console.log(this.price_min);
      console.log(this.price_max);
      return count;
    }
  }