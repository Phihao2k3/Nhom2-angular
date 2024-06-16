import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesComponent } from './categories.component';
import { CategoriesAddComponent } from './add-categories/categories-add.compoment';
import { CategorieslistComponent } from './list-categories/categories-list.compoment';
import { CategoriesUpdateComponent } from './update-categories/categories-update.compoment';

const routes: Routes = [{
  path: '',
  component: CategoriesComponent,
  children: [
    {
      path: 'addCategory',
      component: CategoriesAddComponent,
    },
    {
      path: 'listCategory',
      component: CategorieslistComponent,
    },
    {
      path: 'updateCategory/:id',
      component: CategoriesUpdateComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class categoriesRoutingModule { }

export const routedComponents = [
  CategoriesComponent,
  CategoriesAddComponent,
  CategorieslistComponent, CategoriesUpdateComponent];
