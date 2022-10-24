import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: 'register',
    component: AuthComponent,
  },
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: '',
    redirectTo: "/auth/login",
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
