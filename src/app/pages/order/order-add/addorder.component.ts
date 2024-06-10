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
      total_amount: ['', Validators.required],
      status: ['', Validators.required],
      shipping_address: ['', Validators.required],
      shipping_method: ['', Validators.required],
      shipping_cost: ['', Validators.required],
      payment_method: ['', Validators.required],
      payment_status: ['', Validators.required],
    });

    this.getuser();
    this.getallproduct();
  }

  onSubmit() {
    console.log(this.formOrder.value);
    
    if (this.formOrder.valid) {
      
      this.formOrder.value.total_amount = this.formOrder.value.total_amount.replace(
        /\D/g,
        ''
      );
      
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
        let items = [
          {
            product_id: res.product[0].product_id,
            product_name: res.product[0].title,
            price: res.product[0].price,
            quantity: 1,
          },
        ];
        this.productoderlist.push(items[0]);
        this.totalPrice += res.product[0].price;
      },
      (err) => {
        console.error(err);
      }
    );
  }
  onChangeQta(index: number, newqty: number) {
    this.productoderlist[index].quantity = Number(newqty);
    this.totalPrice = 0;
    this.productoderlist.forEach((element) => {
      this.totalPrice += element.price * element.quantity;
    });
    this.totalPrice = this.totalPrice.toLocaleString('it-IT', {
      style: 'currency',
      currency: 'VND',
    });
    console.log(this.productoderlist);
  }
}
