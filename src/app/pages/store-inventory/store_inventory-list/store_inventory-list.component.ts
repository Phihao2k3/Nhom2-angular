import { Component, OnInit } from '@angular/core';
import { StoreInventoryService } from 'app/@core/services/apis/store_inventory.service'; 
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import { IStore_inventory } from 'app/@core/interfaces/store-inventory.interface';
@Component({
  selector: 'app-store_inventory-list',
  templateUrl: './store_inventory-list.component.html',
  styleUrls: ['./store_inventory-list.component.scss']
})
export class StoreInventoryListComponent implements OnInit {
  storeInventory: IStore_inventory[]= [];
  data = [];

  ngOnInit(): void {
    this.getall_StoreInventory();
  }
  constructor(
    private storeInventory_Service: StoreInventoryService,
    private toastrService: NbToastrService) {
  }

  getall_StoreInventory() {
    this.storeInventory_Service.getallStoreInventory().subscribe(res => {
        this.storeInventory = res.store_inventory;
        this.data = this.storeInventory;
      },
      (err) => {
        console.log(err);
      }
    )
  }
  onSaveConfirm(event) {
    this.storeInventory_Service.updateStoreInventory(event.data.inventory_id, event.newData).subscribe(
      (res) => {
        this.showToast('success', 'Thành công', 'Sửa thành công');
        this.getall_StoreInventory();
      },
      (err) => {
        this.showToast('danger', 'Thất bại', 'Sửa thất bại');

      },
    )
  }
  onDeleteConfirm(event) {
    if (window.confirm("Bạn có muốn tiếp tục xóa không ?")) {
      this.storeInventory_Service.deleteStoreInventory(event.data.inventory_id).subscribe(
        (res) => {
          this.showToast('success', 'Thành công', 'Xóa hóa đơn thành công');
          event.confirm.resolve();
        },
        (err) => {
          this.showToast('danger', 'Thất bại', 'Xóa hóa đơn thất bại');
          event.confirm.reject();
        },
      )
    }
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
      confirmSave: true,

    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      store_id: {
        title: 'Mã cửa hàng',
        // type: 'string',
        editable: false,

      },
      product_id	: {
        title: 'Mã sản phẩm',
        // type: 'string',
        editable: false,
      },
      quantity: {
        title: 'Giá',
        type: 'number',
        // editable: false,
      },
      
    },
    
  };
}
