import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
  ]
})

export class HomeModule {}