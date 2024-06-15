import { Component, OnDestroy } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { OrderService } from 'app/@core/services/apis/order.service';
@Component({
  selector: 'ngx-chartjs-bar',
  template: ` <chart type="bar" [data]="data" [options]="options"></chart> `,
})
export class ChartjsBarComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;

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
    this.OrderService.getdoanhthusoluong().subscribe((data) => {
      let month = [];
      data.doanhthu.forEach((element) => {
        month.push('T ' + element.month);
      });

      this.themeSubscription = this.theme.getJsTheme().subscribe((config) => {
        const colors: any = config.variables;
        const chartjs: any = config.variables.chartjs;

        this.data = {
          labels: month,
          datasets: [
            {
              data: data.doanhthu.map((element) => element.total_revenue),
              label: 'Doanh thu',
              backgroundColor: NbColorHelper.hexToRgbA(
                colors.primaryLight,
                0.8
              ),
            },
          ],
        };

        this.options = {
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            labels: {
              fontColor: chartjs.textColor,
            },
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: true,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
          },
        };
      });
    });
  }
}
