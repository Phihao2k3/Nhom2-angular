import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderComponent } from './order.component';
import { AddorderComponent } from './order-add/addorder.component';
import { OrderlistComponent } from './order-list/orderlist.component';

const routes: Routes = [{
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
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule { }

export const routedComponents = [
  OrderComponent,
  AddorderComponent,
  OrderlistComponent,
];
