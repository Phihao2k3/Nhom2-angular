import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StoreInventoryService } from 'app/@core/services/apis/store_inventory.service';
import { ProductService } from 'app/@core/services/apis/product.service';
import { StoreService } from 'app/@core/services/apis/store.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SpinnerService } from 'app/@theme/components/spinner/spinner.service';
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPhysicalPosition,
} from '@nebular/theme';

@Component({
  selector: 'app-store-inventory-update',
  templateUrl: './store_inventory-update.component.html',
  styleUrls: ['./store_inventory-update.component.scss'],
})
export class StoreInventoryUpdateComponent implements OnInit {
  formUpdate: FormGroup;
  inventoryId: number;
  productlist: { product_id: number, title: string }[] = [];
  storelist: { store_id: number, store_name: string }[] = [];

  constructor(
    private storeInventoryService: StoreInventoryService,
    private product: ProductService,
    private store: StoreService,
    private activatedRoute: ActivatedRoute,
    private spinner: SpinnerService,
    private toastrService: NbToastrService,
    private router: Router
  ) {
    this.getproduct();
    this.getstore();

    this.inventoryId = this.activatedRoute.snapshot.params.id;

    this.formUpdate = new FormGroup({
      store_id: new FormControl('', Validators.required),
      product_id: new FormControl('', Validators.required),
      quantity: new FormControl('', [Validators.required, Validators.min(1)]),
    });

    this.spinner.show();
    this.storeInventoryService.getStoreInventoryById(this.inventoryId).subscribe(
      (data) => {
        console.log(data.store_inventory[0]);
        console.log(this.formUpdate.value);


        this.spinner.hide();
        const inventory = data.store_inventory[0];
        console.log(inventory);
        
        this.formUpdate.patchValue({
          store_id: inventory.store_id,
          product_id: inventory.product_id,
          quantity: inventory.quantity,
        });
      },
      (err) => {
        this.spinner.hide();
        console.error(err);
        this.showToast('danger', 'Lỗi', 'Không thể tải dữ liệu kho hàng');
      }
    );
  }

  ngOnInit(): void { }

  onSubmit() {
    if (this.formUpdate.valid) {
      this.spinner.show();
      this.storeInventoryService.updateStoreInventory(this.inventoryId, this.formUpdate.value).subscribe(
        (data) => {
          this.spinner.hide();
          this.showToast('success', 'Thành công', 'Cập nhật kho hàng thành công');
          this.router.navigate(['/pages/store-inventory/store-inventory-list']);
        },
        (error) => {
          this.spinner.hide();
          console.error(error);
          this.showToast('danger', 'Thất bại', 'Cập nhật kho hàng thất bại');
        }
      );
    } else {
      this.showToast('danger', 'Thất bại', 'Vui lòng điền đầy đủ thông tin');
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
