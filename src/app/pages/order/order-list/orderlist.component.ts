import { Component, OnInit } from '@angular/core';
import { OrderService } from 'app/@core/services/apis/order.service';
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPhysicalPosition,
} from '@nebular/theme';
import { ButtonComponent } from './button/button.component';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-tree-grid',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss'],
})
export class OrderlistComponent implements OnInit {
  constructor(
    private OrderService: OrderService,
    private toastrService: NbToastrService,
    private router: Router
  ) {}
  getAllOrder() {
    this.OrderService.getallOrders().subscribe(
      (res) => {
        res.orders.forEach((element) => {
          // định dạng 2021-05-23
          element.order_date = element.order_date.split('T')[0];
          element.total_amount = element.total_amount.toLocaleString('it-IT', {
            style: 'currency',
            currency: 'VND',
          });
          element.shipping_cost = element.shipping_cost.toLocaleString(
            'it-IT',
            {
              style: 'currency',
              currency: 'VND',
            }
          );
        });
        this.data = res.orders;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  ngOnInit(): void {
    this.getAllOrder();
  }
  onDeleteConfirm(event) {
     this.OrderService.deleteOrder(event.order_id).subscribe(
        (res) => {
          this.showToast('success', 'Thành công', 'Xóa hóa đơn thành công');
          this.getAllOrder();
        },
        (err) => {
          this.showToast('success', 'Thất bại', 'Xóa hóa đơn thất bại');
          
        }
      );
    
  }
  onSaveConfirm(event) {
 this.router.navigate(['/pages/order/oder-update/', event.order_id]);

  }
  private showToast(status: NbComponentStatus, title: string, message: string) {
    this.toastrService.show(message, title, {
      status,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
    });
  }

  settings = {
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
      index: {
        // sử dụng để hiển thị số thứ tự
        title: 'STT',
        type: 'string',
        editable: false,
        addable: false,
        valuePrepareFunction: (value, row, cell) => {
          return cell.row.index + 1;
        },
        filter: false,
      },
      user_id: {
        title: 'Mã Khách hàng',
        type: 'string',
        hide: true,
        editable: false,
        filter: false,
      },
      order_date: {
        title: 'Ngày đặt hàng',
        type: 'string',
        editable: false,
        filter: false,
      },
      total_amount: {
        title: 'Tổng tiền',
        type: 'number',
        editable: false,
        filter: false,
      },
      status: {
        title: 'Trạng thái',
        type: 'number',
        editor: {
          type: 'list',
          config: {
            // 1: đang chờ xác nhận
            // 2: ĐÃ xác nhận
            // 3 : đã hủy
            // 4: thành công
            list: [
              { value: 'Đang chờ xác nhận', title: 'Đang chờ xác nhận' },
              { value: 'Đã xác nhận', title: 'Đã xác nhận' },
              {
                value: 'Đã hủy',
                title: 'Đã hủy',
              },
              {
                value: 'Thành công',
                title: 'Thành công',
              },
            ],
          },
        },
        // đổi màu theo trạng thái
        filter: false,
      },
      shipping_address: {
        title: 'Địa chỉ giao hàng',
        hide: true,
        filter: false,
      },
      shipping_method: {
        title: 'Phương thức giao hàng',
        hide: true,
        filter: false,
      },
      shipping_cost: {
        title: 'Phí giao hàng',
        filter: false,
      },
      payment_method: {
        title: 'Phương thức thanh toán',
        editable: false,

        filter: false,
      },
      payment_status: {
        title: 'Trạng thái thanh toán',
        filter: false,
        editor: {
          type: 'list',
          config: {
            list: [
              { value: 'Chưa thanh toán', title: 'Chưa thanh toán' },
              { value: 'Đã thanh toán', title: 'Đã thanh toán' },
            ],
          },
        },
      },
      detail: {
        title: 'Chi tiết',
        type: 'custom',
        renderComponent: ButtonComponent,
        editable: false,
        addable: false,
        filter: false,
        sort: false,
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
  };

  data = [];
  nextPage(id) {
    this.router.navigate(['/pages/order/oder-detail/', id.order_id]);
  }
}
