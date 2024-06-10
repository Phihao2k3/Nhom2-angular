import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Sử dụng FormBuilder để tạo FormGroup
import { StoreInventoryService } from 'app/@core/services/apis/store_inventory.service'; 
import { ProductService } from 'app/@core/services/apis/product.service';
import { StoreService } from 'app/@core/services/apis/store.service';
import { Router } from '@angular/router';
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPhysicalPosition,
} from '@nebular/theme';

@Component({
  selector: 'app-store-inventory-add',
  templateUrl: './store_inventory-add.component.html',
  styleUrls: ['./store_inventory-add.component.scss']
})
export class StoreInventoryAddComponent implements OnInit {
  formInventory: FormGroup;
  public productlist: { product_id: number, title: string }[] = [];
  public storelist: { store_id: number, store_name: string }[] = [];


  constructor(
    private storeInventoryService: StoreInventoryService,
    private router: Router,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder,
    private product: ProductService,
    private store : StoreService
  ) {
    this.formInventory = this.formBuilder.group({
     
      store_id: ['', Validators.required],
      product_id: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]]
    });
    this.getproduct();
    this.getstore();

  }

  ngOnInit(): void {
  
  }

  onSubmit() {
    if (this.formInventory.valid) {
      this.storeInventoryService.createStoreInventory(this.formInventory.value).subscribe(
        (res) => {
          this.showToast('success', 'Thành công', 'Thêm kho hàng thành công');
          this.router.navigate(['/pages/store-inventory/store-inventory-list']);
        },
        (err) => {
          console.log(err);
          this.showToast('danger', 'Thất bại', 'Thêm kho hàng thất bại');
        }
      );
    } else {
      this.showToast('danger', 'Lỗi', 'Vui lòng điền đầy đủ thông tin cần thiết');
    }
  }

  getproduct() {
    this.product.getallProducts().subscribe(
      (res) => {
        this.productlist = res.product;
        console.log(this.productlist);
      },
      (err) => {
        console.error(err);
      }
    );
  }
  getstore() {
    this.store.getAllStore().subscribe(
      (res) => {
        this.storelist = res.stores;
        console.log(this.storelist);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  private showToast(status: NbComponentStatus, title: string, message: string) {
    this.toastrService.show(message, title, {
      status,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
    });
  }
}
