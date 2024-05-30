import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesComponent } from './categories.component';
import { CategoriesaddComponent } from './add-categories/categories-add.compoment';
import { categorieslistComponent } from './list-categories/categories-list.compoment';

const routes: Routes = [{
  path: '',
  component: CategoriesComponent,
  children: [
    {
      path: 'addCategory',
      component: CategoriesaddComponent,
    },
    {
      path: 'listCategory',
      component: categorieslistComponent,
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
  CategoriesaddComponent,
  categorieslistComponent];
