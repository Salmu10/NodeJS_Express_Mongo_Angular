import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopComponent } from './shop.component';
import { SharedModule } from '../shared';
import { ShopRoutingModule } from './shop-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule
  ],
  declarations: [
    ShopComponent
  ],
  providers: [
  ]
})

export class ShopModule { }