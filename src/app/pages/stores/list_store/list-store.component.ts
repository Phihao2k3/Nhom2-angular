import { Component, Input, OnInit } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { Router } from '@angular/router';
import { StoreService } from 'app/@core/services/apis/store.service';
import { IStores } from 'app/@core/interfaces/stores.interface';
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'ngx-tree-grid',
  templateUrl: './list-store.component.html',
  styleUrls: ['./list-store.component.scss'],
})
export class ListStoreComponent implements OnInit {
  stores: IStores[] = [];

  ngOnInit(): void {
    this.getStore();
  }

  constructor(
    private store_service: StoreService,
    private toastrService: NbToastrService,
    private router: Router
  ) {

  }

  getStore() {
    this.store_service.getAllStore().subscribe(res => {
      this.stores = res.stores;// res.stores lấy từ api xuống
      this.data = this.stores;
    }, err => {
      console.log(err);
    })
  }

  onDeleteConfirm(event) {
      this.store_service.deleteStore(event.store_id).subscribe(
        (res) => {
          this.showToast('success', 'Thành công', 'Xóa cửa hàng thành công');
          event.confirm.resolve();
        },
        (err) => {
          this.showToast('success', 'Thất bại', 'Xóa cửa hàng thất bại');
          event.confirm.reject();
        },
      )
    
  }

  onSaveConfirm(event) {

    this.store_service.updateStore(event.data.store_id, event.newData).subscribe(
      (res) => {
        this.showToast('success', 'Thành công', 'Sửa thành công');
        this.getStore()
      },
      (err) => {
        this.showToast('success', 'Thất bại', 'Sửa thất bại');
      },
    )
  }

  editStore(id): void {
    this.router.navigate(['/pages/store/update-store/', id]);
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
      store_id: {
        title: 'ID',
        hide: true
      },
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
      store_name: {
        title: 'Tên cửa hàng',
      },
      address: {
        title: 'Địa chỉ',
      },
      phone_number: {
        title: 'Số điện thoại',
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
      },
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
  }


  data = [];
}

