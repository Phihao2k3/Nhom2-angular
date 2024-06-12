import { Component, Input, OnInit } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { Router } from '@angular/router';
import { UserService } from 'app/@core/services/apis/user.service';
import { IUsers } from 'app/@core/interfaces/users.interface';
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import { API_BASE_URL } from 'app/@core/config/api-endpoint.config';
import { API_ENDPOINT } from 'app/@core/config/api-endpoint.config';

@Component({
  selector: 'ngx-tree-grid',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {
  users: IUsers[] = [];

  lastPage: number = 0;
  currentPage: number = 0;
  apiURL = 'http://localhost:2904/api/users';


  ngOnInit(): void {
    this.getUser();
  }

  constructor(
    private user_service: UserService,
    private toastrService: NbToastrService
  ) {

  }

  getUser() {
    this.user_service.getAllUser().subscribe(res => {
      this.users = res.users;
      this.data = this.users;
      // this.currentPage = res.meta.current_page;
      // console.log(res.meta.current_page);
      
      // this.lastPage = res.meta.last_page;
    }, err => {
      console.log(err);
    })
  }

  getPage(res: any){
    this.data = res.users;
    console.log(res);
  }

  onDeleteConfirm(event) {
    if (window.confirm("Bạn có muốn tiếp tục xóa không ?")) {
      this.user_service.deleteUser(event.data.user_id).subscribe(
        (res) => {
          this.showToast('success', 'Thành công', 'Xóa tài khoản thành công');
          event.confirm.resolve();
        },
        (err) => {
          this.showToast('success', 'Thất bại', 'Xóa tài khoản thất bại');
          event.confirm.reject();
        },
      )
    }
  }

  onSaveConfirm(event) {
   
    this.user_service.updateUser(event.data.user_id, event.newData).subscribe(
      (res) => {
        this.showToast('success', 'Thành công', 'Sửa thành công');
        this.getUser()
      },
      (err) => {
        this.showToast('success', 'Thất bại', 'Sửa thất bại');
      },
    )
  }

  private showToast(status: NbComponentStatus, title: string, message: string) {
    this.toastrService.show(message, title, {
      status,
      position: NbGlobalPhysicalPosition.TOP_RIGHT
    })
  }

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
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      user_id: {
        title: 'ID',
        hide: true
      },
      username: {
        title: 'Tên đăng nhập',
      },
      first_name: {
        title: 'Họ',
      },
      last_name: {
        title: 'Tên',
      },
      email: {
        title: 'Email',
      },
      role: {
        title: 'Vai trò',
        editor: {
          type: 'list',
          config: {
            list: [{ value: '1', title: 'Nhân viên' }, { value: '2', title: 'Quản lý' }]
          }
        }
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

  data = [];
}

