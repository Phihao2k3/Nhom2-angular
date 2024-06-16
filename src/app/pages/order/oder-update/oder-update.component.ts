import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'app/@core/services/apis/order.service';
import { NbToastrService } from '@nebular/theme';
@Component({
  selector: 'app-order-update',
  templateUrl: './oder-update.component.html',
  styleUrls: ['./oder-update.component.scss'],
})
export class OderUpdateComponent implements OnInit {
  formUpdate: FormGroup;
  id: number;
  order: any;
  productoderlist: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private toastrService: NbToastrService
  ) {
    this.id = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.formUpdate = new FormGroup({
      order_id: new FormControl(''),
      user_id: new FormControl(''),
      order_date: new FormControl(''),
      total_amount: new FormControl(''),
      status: new FormControl(''),
      shipping_address: new FormControl(''),
      shipping_method: new FormControl(''),
      shipping_cost: new FormControl(''),
      payment_method: new FormControl(''),
      payment_status: new FormControl(''),
    });

    this.orderService.getoderbyid(this.id).subscribe((data) => {
      this.order = data.orders[0];

      this.formUpdate.patchValue({
        order_id: this.order.order_id,
        user_id: this.order.user_id,
        order_date: this.formatDate(this.order.order_date),
        total_amount: this.order.total_amount,
        status: this.order.status,
        shipping_address: this.order.shipping_address,
        shipping_method: this.order.shipping_method,
        shipping_cost: this.order.shipping_cost,
        payment_method: this.order.payment_method,
        payment_status: this.order.payment_status,
      });

      this.orderService
        .getOrderDetailById(this.order.order_id)
        .subscribe((data) => {
          this.productoderlist = data.order_detail;
        });
    });
  }
  formatDate(date: string): string {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }
  onSubmit() {
    this.orderService.updateOrder(this.id, this.formUpdate.value).subscribe(
      (res) => {
        this.toastrService.show('Thành công', 'Sửa đơn hàng thành công', {
          status: 'success',
        });
      },
      (err) => {
        this.toastrService.show('Thất bại', 'Sửa đơn hàng thất bại', {
          status: 'danger',
        });
      }
    );
  }
}
