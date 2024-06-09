import { Component, OnInit } from '@angular/core';
import { OrderService } from 'app/@core/services/apis/order.service';
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
@Component({
  selector: 'ngx-tree-grid',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss']
})
export class OrderlistComponent implements OnInit {
  constructor(private OrderService: OrderService, private toastrService: NbToastrService) {

  }
  getAllOrder() {
    this.OrderService.getallOrders().subscribe(
      (res) => {
        this.data = res.orders
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    )
  }
  ngOnInit(): void {
    this.getAllOrder()
  }
  onDeleteConfirm(event) {
    if (window.confirm("Bạn có muốn tiếp tục xóa không ?")) {
      this.OrderService.deleteOrder(event.data.order_id).subscribe(
        (res) => {
          this.showToast('success', 'Thành công', 'Xóa hóa đơn thành công');
          event.confirm.resolve();
        },
        (err) => {
          this.showToast('success', 'Thất bại', 'Xóa hóa đơn thất bại');
          event.confirm.reject();
        },
      )
    }
  }
  onSaveConfirm(event) {
    this.OrderService.updateOrder(event.data.order_id, event.newData).subscribe(
      (res) => {
        this.showToast('success', 'Thành công', 'Sửa thành công');
        this.getAllOrder()
      },
      (err) => {
        this.showToast('success', 'Thất bại', 'Sửa thất bại');

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
      user_id: {
        title: 'Mã Khách hàng',
        type: 'string',
        hide: true,
        editable: false,

      },
      order_date: {
        title: 'Ngày đặt hàng',
        type: 'string',
        editable: false,
      },
      total_amount: {
        title: 'Giá',
        type: 'number',
        editable: false,
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
            list: [{ value: 'Đang chờ xác nhận', title: 'Đang chờ xác nhận' }, { value: 'Đã xác nhận', title: 'Đã xác nhận' }, {
              value: 'Đã hủy',
              title: 'Đã hủy'
            },{
              value: 'Thành công',
              title: 'Thành công'
            }]
          }
        }
      },
      shipping_address: {
        title: 'Địa chỉ giao hàng',
        hide: true
      },
      shipping_method: {
        title: 'Phương thức giao hàng',
        hide: true
      },
      shipping_cost: {
        title: 'Phí giao hàng',
        hide: true
      },
      payment_method: {
        title: 'Phương thức thanh toán',
        hide: true
      },
      payment_status: {
        title: 'Trạng thái thanh toán',
        hide: true
      },
      // imageUrl: {
      //   title: 'Hình Ảnh',
      //   type: 'html',
      //   valuePrepareFunction: (imageUrl: string) => {
      //     return `<img src="${imageUrl}" class="img-thumbnail" />`;
      //   },
      //   filter: false,
      // },
    },
  };

  data = [
    {
      productName: 'Game Disc 1',
      category: 'Action',
      price: 59.99,
      quantity: 100,
      imageUrl: 'https://picsum.photos/100/100?random=1',
    },
    {
      productName: 'Game Disc 2',
      category: 'Adventure',
      price: 49.99,
      quantity: 150,
      imageUrl: 'https://picsum.photos/100/100?random=2',
    },
    {
      productName: 'Game Disc 3',
      category: 'RPG',
      price: 69.99,
      quantity: 200,
      imageUrl: 'https://picsum.photos/100/100?random=3',
    },
    {
      productName: 'Game Disc 4',
      category: 'Strategy',
      price: 39.99,
      quantity: 50,
      imageUrl: 'https://picsum.photos/100/100?random=4',
    },
    {
      productName: 'Game Disc 5',
      category: 'Sports',
      price: 29.99,
      quantity: 75,
      imageUrl: 'https://picsum.photos/100/100?random=5',
    },
  ];
}
