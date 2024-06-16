import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreComponent } from './store.component';
import { AddStoreComponent } from './add-store/add-store.component';
import { ListStoreComponent } from './list_store/list-store.component';
import { StoreUpdateComponent } from './update-store/stores-update.compoment';

const routes: Routes = [{
  path: '',
  component: StoreComponent,
  children: [
    {
      path: 'addstore',
      data: { breadcrumb: 'Thêm cửa hàng' },
      component: AddStoreComponent,
    },
    {
      path: 'liststore',
      data: { breadcrumb: 'Hiển thị danh sách' },
      component: ListStoreComponent,
    },
    {
      path: 'update-store/:id',
      data: { breadcrumb: ' Cập nhật danh sách' },
      component: StoreUpdateComponent,
    },
    
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRoutingModule { }

export const routedComponents = [
  StoreComponent,
  AddStoreComponent,
  ListStoreComponent,
];
