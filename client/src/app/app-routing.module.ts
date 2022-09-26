import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then(m => m.CategoriesModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then(m => m.ProductsModule)
  },
  {
    path: 'furniture',
    loadChildren: () => import('./furniture/furniture.module').then(m => m.FurnituresModule)
  },
  {
    path: '',
    redirectTo: 'category',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }