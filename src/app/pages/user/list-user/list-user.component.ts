import { Component, Input } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';


@Component({
  selector: 'ngx-tree-grid',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent {
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      ID: {
        title: 'ID',
      },
      username: {
        title: 'Tên đăng nhập',
      },
      password: {
        title: 'Mật khẩu',
      },
      first: {
        title: 'Họ',
      },
      last: {
        title: 'Tên',
      },
      email: {
        title: 'Email',
      },
      role: {
        title: 'Vai trò', 
      },
      
    },
    actions: {
      // Define actions column
      title: 'Actions',
      type: 'html',
      filter: false,
      sort: false,
    },
  };

  data = [
    {
      ID: 1,
      username: 'nthaiduong00000',
      password: 'teketeke123',
      first: 'Nguyễn',
      last: 'Thái Dương',
      email: 'duonghehe@gmail.com',
      role: 'Nhân viên',
    },
    {
      ID: 2,
      username: 'haodomdom',
      password: 'jack97',
      first: 'Trần',
      last: 'Phi Hào',
      email: 'haodomdom97@gmail.com',
      role: 'Khách hàng',
    },
  ];
}

