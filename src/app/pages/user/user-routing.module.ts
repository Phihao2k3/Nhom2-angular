import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUserComponent } from './list-user/list-user.component';

const routes: Routes = [{
  path: '',
  component: UserComponent,
  children: [
    {
      path: 'adduser',
      data: { breadcrumb: 'Thêm người dùng' },
      component: AddUserComponent,
    },
    {
      path: 'listuser',
      data: { breadcrumb: 'Hiển thị danh sách' },
      component: ListUserComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }

export const routedComponents = [
  UserComponent,
  AddUserComponent,
  ListUserComponent,
];
