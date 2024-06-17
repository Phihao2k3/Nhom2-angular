import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { OrderService } from 'app/@core/services/apis/order.service';
@Component({
  selector: 'ngx-chartjs-pie',
  template: ` <chart type="pie" [data]="data" [options]="options"></chart> `,
})
export class ChartjsPieComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;
  odersuccess = 0;
  odercancel = 0;
  oderdelivering = 0;
  constructor(
    private theme: NbThemeService,
    private OrderService: OrderService
  ) {
    this.getallOrder();
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
  getallOrder() {
    this.OrderService.getallOrders().subscribe((data) => {
      data.orders.forEach((element) => {
        if (element.status == 'Thành công') {
          this.odersuccess++;
        } else if (element.status == 'Đã hủy') {
          this.odercancel++;
        } else if (element.status == 'Đang chờ xác nhận') {
          this.oderdelivering++;
        }
      });
      this.themeSubscription = this.theme.getJsTheme().subscribe((config) => {
        const colors: any = config.variables;
        const chartjs: any = config.variables.chartjs;
  
        this.data = {
          labels: ['Đơn đã giao', 'Đơn hủy', 'Đang chờ xác nhận'],
          datasets: [
            {
              data: [this.odersuccess, this.odercancel, this.oderdelivering],
              backgroundColor: [
                colors.primaryLight,
                colors.infoLight,
                colors.successLight,
              ],
            },
          ],
        };
  
        this.options = {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            xAxes: [
              {
                display: false,
              },
            ],
            yAxes: [
              {
                display: false,
              },
            ],
          },
          legend: {
            labels: {
              fontColor: chartjs.textColor,
            },
          },
        };
      });
    });
  }
}
