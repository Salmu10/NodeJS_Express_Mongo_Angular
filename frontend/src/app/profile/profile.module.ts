import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    SharedModule,
    CommonModule,
    ProfileRoutingModule,
  ],
})

export class ProfileModule {}