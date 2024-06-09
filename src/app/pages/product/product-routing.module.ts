import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './product.component';
import { productaddComponent } from './Add-product/product-add.compoment';
import { productlistComponent } from './List-product/product-list.compoment';
import { UpdateProductComponent } from './update-product/update-product.component';

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
    {
      path: 'editproduct/:id',
      component: UpdateProductComponent,
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
