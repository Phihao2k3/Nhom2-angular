import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProfileComponent } from './profile/profile.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';

const routes: Routes = [
  {
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
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'product',
        loadChildren: () =>
          import('./product/product.module').then((m) => m.ProductModule),
      },
      {
        path: 'order',
        loadChildren: () =>
          import('./order/order.module').then((m) => m.OrderModule),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./categories/categories.module').then(
            (m) => m.categoriesModule
          ),
      },
      {
        path: 'store-inventory',
        loadChildren: () =>
          import('./store-inventory/store_inventory.module').then(
            (m) => m.store_inventoryModule
          ),
      },
      {
        path: 'attendance',
        loadChildren: () =>
          import('./attendance/attendance.module').then(
            (m) => m.AttendanceModule
          ),
      },
      {
        path: 'employees',
        loadChildren: () =>
          import('./employees/employees.module').then((m) => m.employeesModule),
      },
      {
        path: 'store',
        data: { breadcrumb: 'Store' },
        loadChildren: () => import("./stores/store.module").then(m => m.StoreModule)
      },

      {
        path: 'profile',
        component: ProfileComponent,
        data: { breadcrumb: 'Profile' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
