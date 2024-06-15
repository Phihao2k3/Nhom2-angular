import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreInventoryComponent } from './store-inventory.component'; 
import { StoreInventoryAddComponent } from './store_inventory-add/store_inventory-add.component';
import { StoreInventoryListComponent } from './store_inventory-list/store_inventory-list.component'; 
import { StoreInventoryUpdateComponent } from './store_inventory-update/store_inventory-update.component';
const routes: Routes = [{
  path: '',
  component: StoreInventoryComponent,
  children: [
    {
      path: 'store-inventory-add',
      component: StoreInventoryAddComponent,
    },
    {
      path: 'store-inventory-list',
      component: StoreInventoryListComponent,
    },
    {
      path: 'store-inventory-update/:id',
      component: StoreInventoryUpdateComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreInventoryRoutingModule { }

export const routedComponents = [
    StoreInventoryComponent,
 StoreInventoryAddComponent,
 StoreInventoryListComponent,
 StoreInventoryUpdateComponent
];
