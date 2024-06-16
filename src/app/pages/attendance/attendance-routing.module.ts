import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttendanceComponent } from './attendance.component'; 
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import { AttendanceUpdateComponent } from './attendance-update/attendance-update.component';
const routes: Routes = [{
  path: '',
  component: AttendanceComponent,
  children: [
    // {
    //   path: 'store-inventory-add',
    //   component: StoreInventoryAddComponent,
    // },
    {
      path: 'attendance-list',
      component: AttendanceListComponent,
    },
    {
      path: 'attendance-update/:id',
      component: AttendanceUpdateComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreInventoryRoutingModule { }

export const routedComponents = [
  AttendanceComponent,
  AttendanceListComponent,
  AttendanceUpdateComponent,
  
];
