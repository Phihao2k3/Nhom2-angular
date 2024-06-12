import { Component, OnInit } from '@angular/core';
import { OrderService } from 'app/@core/services/apis/order.service';
import { ProductService } from 'app/@core/services/apis/product.service';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  Totalproduct = 0;
  Totalorder = 0;
  totalmoney = 0;

  ngOnInit(): void {}
  constructor(
    private OrderService: OrderService,
    private ProductService: ProductService
  ) {
    this.getallOrder();
    this.getallProduct();
  }
  getallOrder() {
    this.OrderService.getallOrders().subscribe((data) => {
      this.Totalorder = data.orders.length;
      data.orders.forEach((element) => {
        this.totalmoney += element.total_amount;
        
      });
    });
  }
  getallProduct() {
    this.ProductService.getallProducts().subscribe((data) => {
      this.Totalproduct = data.product.length;
    });
  }
}
