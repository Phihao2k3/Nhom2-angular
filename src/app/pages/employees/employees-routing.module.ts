import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeesComponent } from './employees.component';
import { EmployeesAddComponent } from './add-employees/employees-add.compoment';
import { EmployeeslistComponent } from './list-employees/employees-list.compoment';

const routes: Routes = [{
  path: '',
  component: EmployeesComponent,
  children: [
    {
      path: 'addEmployees',
      component: EmployeesAddComponent,
    },
    {
      path: 'listEmployees',
      component: EmployeeslistComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class employeesRoutingModule { }

export const routedComponents = [
  EmployeesComponent,
  EmployeesAddComponent,
  EmployeeslistComponent];
