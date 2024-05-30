import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './product.component';
import { productaddComponent } from './Add-product/product-add.compoment';
import { productlistComponent } from './List-product/product-list.compoment';

const routes: Routes = [{
  path: '',
  component: ProductComponent,
  children: [
    {
      path: 'addproduct',
      component: productaddComponent,
    },
    {
      path: 'listproduct',
      component: productlistComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class productRoutingModule { }

export const routedComponents = [
  ProductComponent,
  productaddComponent,
  productlistComponent,
];
