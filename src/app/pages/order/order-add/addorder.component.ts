import { Component } from '@angular/core';
import { OrderService } from 'app/@core/services/apis/order.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Sử dụng FormBuilder để tạo FormGroup
import { UserService } from 'app/@core/services/apis/user.service';
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPhysicalPosition,
} from '@nebular/theme';

@Component({
  selector: 'app-addorder',
  templateUrl: './addorder.component.html',
  styleUrls: ['./addorder.component.scss']
})
export class AddorderComponent {
  formOrder: FormGroup; 

  public userlist: { user_id: number, username: string }[] = [];

  constructor(
    private order: OrderService,
    private router: Router,
    private users: UserService,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder 
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
  }

  onSubmit() {
    if (this.formOrder.valid) {
      this.order.createOrder(this.formOrder.value).subscribe(
        (res) => {
          this.showToast('success', 'Thành công', 'Thêm đơn hàng thành công');
          this.router.navigate(['/pages/order/listorder']);
        },
        (err) => {
          console.log(err);
          this.showToast('danger', 'Thất bại', 'Thêm đơn hàng thất bại');
        }
      );
    } else {
      this.showToast('danger', 'Lỗi', 'Vui lòng điền đầy đủ thông tin cần thiết');
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

  private showToast(status: NbComponentStatus, title: string, message: string) {
    this.toastrService.show(message, title, {
      status,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
    });
  }
}
