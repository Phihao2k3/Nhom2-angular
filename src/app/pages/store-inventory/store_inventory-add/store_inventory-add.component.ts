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
  qty: number;
  qtycheck: any = 0;
  constructor(
    private storeInventoryService: StoreInventoryService,
    private router: Router,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder,
    private product: ProductService,
    private store: StoreService
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
  onSelectProduct(value) {

    this.product.getProductById(value).subscribe(
      (data) => {


        this.qty = data.product[0].stock


      })

  }
  onSubmit() {
    this.storeInventoryService.getallStoreInventory().subscribe(
      (data) => {


        if (this.formInventory.valid) {
          let totalQuantity = 0; // tổng giá của thêm mới
          let productExists = false; 
          let storeExists = false;
          let idstore_iventory;//id của cửa hàng bị trùng
          let totalQuantity2 = 0//tổng sl của cửa hàng
          // Kiểm tra xem sản phẩm đã tồn tại trong kho chưa và tính tổng số lượng hiện tại
          data.store_inventory.forEach((e) => {

            if (this.formInventory.value.product_id == e.product_id) {
              if (this.formInventory.value.store_id == e.store_id && this.formInventory.value.product_id == e.product_id) {
                console.log(e);

                totalQuantity2 = e.quantity//lấy sl của CH đã có
                storeExists = true//đánh dấu
                idstore_iventory = e.inventory_id
              }

              productExists = true;
              totalQuantity += e.quantity

            }
          });

          // Cộng thêm số lượng của sản phẩm mới
          totalQuantity += this.formInventory.value.quantity;
          totalQuantity2 += this.formInventory.value.quantity;

          console.log('tổng số lượng hàng đã thêm trong kho của sp :' + totalQuantity)
          console.log('tổng số lượng hàng đã thêm trong kho của sp :' + totalQuantity2)

          // Kiểm tra nếu tổng số lượng vượt quá giới hạn
          // console.log('tổng số lượng hàng đã thêm trong kho của sp :' + totalQuantity)
          console.log('tổng số lượng của sản phẩm gốc :' + this.qty);

          if (totalQuantity > this.qty) {
            this.showToast('danger', 'Thất bại', 'Số lượng vượt quá giới hạn');
            return; // Dừng lại không thêm sản phẩm nữa
          }if (totalQuantity2 > this.qty) {
            this.showToast('danger', 'Thất bại', 'Số lượng vượt quá giới hạn');
            return; // Dừng lại không thêm sản phẩm nữa
          }
          if (storeExists) {
            let data = this.formInventory.value
            data.quantity = totalQuantity2

            this.storeInventoryService.updateStoreInventory(idstore_iventory, data).subscribe((res) => {
              this.showToast('success', 'Thành công', 'Thêm kho hàng thành công');
              this.router.navigate(['/pages/store-inventory/store-inventory-list']);
            },
              (err) => {
                console.log(err);
                this.showToast('danger', 'Thất bại', 'Thêm kho hàng thất bại');
              })
          } else {
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

          }
          // Nếu không có lỗi số lượng, thực hiện thêm sản phẩm vào kho
        } else {
          this.showToast('danger', 'Lỗi', 'Vui lòng điền đầy đủ thông tin cần thiết');
        }
      },
      (err) => {
        console.log("Lỗi khi lấy dữ liệu kho:", err);
        this.showToast('danger', 'Lỗi', 'Không thể lấy dữ liệu kho');
      }
    );
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
