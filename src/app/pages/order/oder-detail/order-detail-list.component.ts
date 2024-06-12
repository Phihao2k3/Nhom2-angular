import { Component, OnInit } from '@angular/core';
import { OrderService } from 'app/@core/services/apis/order.service';
import { ProductService } from 'app/@core/services/apis/product.service';

import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'ngx-tree-grid',
  templateUrl: './order-detail-list.component.html',
})
export class orderdetaillistComponent implements OnInit {
  id: number;
  constructor(
    private OrderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private ProductService: ProductService
  ) {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getallOrderDetail();
  }

  ngOnInit(): void {}

  settings = {
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
        filter: false
      },
      order_detail_id: {
        title: 'ID',
        type: 'string',
        hide: true,
        editable: false,
        filter: false
      },
      order_id: {
        title: 'Mã đơn hàng',
        type: 'string',
        editable: false,
        filter: false
      },
      title: {
        title: 'Tên sản phẩm',
        type: 'number',
        editable: false,
        filter: false
      },
      price: {
        title: 'Giá',
        type: 'number',
        editable: false,
        filter: false
      },
      quantity: {
        title: 'Số lượng',
        type: 'number',
        editable: false,
        filter: false
      },
      
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
  };

  data = [];
  getallOrderDetail() {
    this.OrderService.getOrderDetailById(this.id).subscribe(
      (res) => {
        this.data = res.order_detail;
        this.data.forEach((element) => {
          element.price = element.price.toLocaleString('it-IT', {
            style: 'currency',
            currency: 'VND',
          });
        });
        console.log(res);
        
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
