import { Component, OnInit } from '@angular/core';
import { StoreInventoryService } from 'app/@core/services/apis/store_inventory.service'; 
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import { IStore_inventory } from 'app/@core/interfaces/store-inventory.interface';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ButtonComponent } from '../button/button.component';
import { Router } from '@angular/router';
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
    private toastrService: NbToastrService,
  private Router:Router) {
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
  editProduct(id): void {
    this.Router.navigate(['/pages/store-inventory/store-inventory-update/', id]);
  }
  onDeleteConfirm(event) {
     
      this.storeInventory_Service.deleteStoreInventory(event.inventory_id).subscribe(
        (res) => {
       
          this.getall_StoreInventory()
        },
        (err) => {
          this.showToast('danger', 'Thất bại', 'Xóa hóa đơn thất bại');
       
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
        title: 'Số lượng',
        type: 'number',
        // editable: false,
      },
      customColumn: {
        title: '',
        type: 'custom',
        renderComponent: ButtonComponent,
        filter: false,
        sort: false,
      },
    },actions:
    {
      // Define actions column
      title: 'Actions',
      type: 'html',
      position: 'right',
      add: false,
      edit: false,
      delete: false,
      selector: false,
    }
    
  };
}
