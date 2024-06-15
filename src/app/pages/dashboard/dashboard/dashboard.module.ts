import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { ChartjsPieComponent } from './chartjs/chartjs-pie.component';
import { ChartjsBarComponent } from './chartjs/chartjs-bar.component';
import {
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbTreeGridModule,
  NbActionsModule,
  NbButtonModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { BreadcrumbModule } from 'xng-breadcrumb';

@NgModule({
  imports: [
    BreadcrumbModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    NbActionsModule,
    NbButtonModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    Ng2SmartTableModule,
    NgxEchartsModule,

    NgxChartsModule,
    ChartModule,
  ],
  declarations: [DashboardComponent,ChartjsPieComponent,ChartjsBarComponent],
})
export class DashboardModule {}
