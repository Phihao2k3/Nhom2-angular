import { Component } from '@angular/core';
import { OrderService } from 'app/@core/services/apis/order.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Sử dụng FormBuilder để tạo FormGroup
import { UserService } from 'app/@core/services/apis/user.service';
import { ProductService } from 'app/@core/services/apis/product.service';
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPhysicalPosition,
} from '@nebular/theme';

@Component({
  selector: 'app-addorder',
  templateUrl: './addorder.component.html',
  styleUrls: ['./addorder.component.scss'],
})
export class AddorderComponent {
  formOrder: FormGroup;
  productoderlist: any[] = [];
  productlist: { product_id: number; product_name: string }[] = [];
  public userlist: { user_id: number; username: string }[] = [];
  totalPrice: any = 0;
  constructor(
    private order: OrderService,
    private router: Router,
    private users: UserService,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder,
    private product: ProductService
  ) {
    this.formOrder = this.formBuilder.group({
      user_id: ['', Validators.required],
      order_date: ['', Validators.required],
      total_amount: ['', [Validators.required, Validators.min(1)]],
      status: ['', Validators.required],
      shipping_address: ['', Validators.required],
      shipping_method: ['', Validators.required],
      shipping_cost: ['', Validators.required],
      payment_method: ['', Validators.required],
      payment_status: ['', Validators.required],
    });

    this.getuser();
    this.getallproduct();
    this.formOrder.get('shipping_method').valueChanges.subscribe((value) => {
      this.updateShippingCost(value);
    });
  }

  onSubmit() {
    this.formOrder.patchValue({ total_amount: this.totalPrice });

    if (this.formOrder.valid) {
      console.log('====================================');
      console.log(this.formOrder.value);
      console.log('====================================');
      this.order.createOrder(this.formOrder.value).subscribe(
        (res) => {
          // chỉ lấy ngày tháng năm
          this.showToast('success', 'Thành công', 'Thêm đơn hàng thành công');
          this.productoderlist.forEach((element) => {
            this.order
              .addOrderDetail({
                order_id: res.orders.insertId,
                product_id: element.product_id,
                quantity: element.quantity,
                price: element.price,
              })
              .subscribe(
                (res) => {
                  console.log(res);
                },
                (err) => {
                  console.error(err);
                }
              );
          });
          console.log(res);

          // this.router.navigate(['/pages/order/listorder']);
        },
        (err) => {
          console.log(err);
          this.showToast('danger', 'Thất bại', 'Thêm đơn hàng thất bại');
        }
      );
    } else {
      this.showToast(
        'danger',
        'Lỗi',
        'Vui lòng điền đầy đủ thông tin cần thiết'
      );
    }
  }

  getuser() {
    this.users.getAllUser().subscribe(
      (res) => {
        this.userlist = res.users;
        console.log(this.userlist);
      },
      (err) => {
        console.error(err);
      }
    );
  }
  getallproduct() {
    this.product.getallProducts().subscribe(
      (res) => {
        this.productlist = res.product;
        console.log(res);
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
  onSelectProduct(id) {
    this.product.getProductById(id).subscribe(
      (res) => {
        let product = {
          product_id: res.product[0].product_id,
          product_name: res.product[0].title,
          price: res.product[0].price,
          quantity: 1,
        };
        this.productoderlist.push(product);
        this.calculateTotalPrice();
        this.formOrder.patchValue({ total_amount: this.totalPrice });
      },
      (err) => {
        console.error(err);
      }
    );
  }

  onChangeQta(index: number, newqty: number, event) {
    if (newqty < 1) {
      newqty = 1;
      event.target.value = 1;
    }
    this.productoderlist[index].quantity = Number(newqty);
    this.calculateTotalPrice();
    this.formOrder.patchValue({ total_amount: this.totalPrice });
  }

  calculateTotalPrice() {
    this.totalPrice = this.productoderlist.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
  }

  removeProduct(index: number) {
    this.productoderlist.splice(index, 1);
    this.calculateTotalPrice();
    this.formOrder.patchValue({ total_amount: this.totalPrice });
  }
  updateShippingCost(method: string) {
    if (method === 'Giao hàng nhanh') {
      this.formOrder.get('shipping_cost').setValue(35000);
    } else if (method === 'Giao hàng tiêu chuẩn') {
      this.formOrder.get('shipping_cost').setValue(25000);
    }
  }
}
