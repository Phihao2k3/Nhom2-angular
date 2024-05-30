import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
      data: { breadcrumb: 'Dashboard' },
    },
    {
      path: 'user',
      loadChildren: () => import("./user/user.module").then(m => m.UserModule)
    },
    {
      path: 'product',
      loadChildren: () => import("./product/product.module").then(m => m.ProductModule)
    },
    {
      path: 'order',
      loadChildren: () => import("./order/order.module").then(m => m.OrderModule)
    },
    {
      path: 'categories',
      loadChildren: () => import("./categories/categories.module").then(m => m.categoriesModule)
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
