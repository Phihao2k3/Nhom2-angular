import { Component, Input, OnInit } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { Router } from '@angular/router';
import { UserService } from 'app/@core/services/apis/user.service';
import { IUsers } from 'app/@core/interfaces/users.interface';
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import { API_BASE_URL } from 'app/@core/config/api-endpoint.config';
import { API_ENDPOINT } from 'app/@core/config/api-endpoint.config';
import { ButtonComponent } from '../button/button.component';

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
    private toastrService: NbToastrService,
    private router: Router
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

  getPage(res: any) {
    this.data = res.users;
    console.log(res);
  }

  onDeleteConfirm(event) {
    this.user_service.deleteUser(event.user_id).subscribe(
      (res) => {
        this.getUser();
      },
      (err) => {
        this.showToast('success', 'Thất bại', 'Xóa tài khoản thất bại');
        event.confirm.reject();
      },
    )
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

  updateUser(id): void {
    this.router.navigate(['/pages/user/update-user/', id]);
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
      index: {
        title: 'STT',
        type: 'number',
        filter: false,
        editable: false,
        addable: false,
        valuePrepareFunction: (value, row, cell) => {
          return cell.row.index + 1;
        },
      },
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
      customColumn: {
        title: '',
        type: 'custom',
        renderComponent: ButtonComponent,
        filter: false,
        sort: false,
      }
    },
    actions: {
      // Define actions column
      title: 'Actions',
      type: 'html',
      filter: false,
      sort: false,
      position: 'right',
      add: false,
      edit: false,
      delete: false,
      selector: false,
    },
  };

  data = [];
}

