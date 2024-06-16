import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderComponent } from './order.component';
import { AddorderComponent } from './order-add/addorder.component';
import { OrderlistComponent } from './order-list/orderlist.component';
import { orderdetaillistComponent } from './oder-detail/order-detail-list.component';
import { OderUpdateComponent } from './oder-update/oder-update.component';
const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
    children: [
      {
        path: 'addorder',
        component: AddorderComponent,
      },
      {
        path: 'listorder',
        component: OrderlistComponent,
      },
      {
        path: 'oder-detail/:id',
        component: orderdetaillistComponent,
      },
      {
        path: 'oder-update/:id',
        component: OderUpdateComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}

export const routedComponents = [
  OrderComponent,
  AddorderComponent,
  OrderlistComponent,
  orderdetaillistComponent,
];
