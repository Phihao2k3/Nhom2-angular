import { NgModule } from '@angular/core';
import { NbMenuModule } from "@nebular/theme";
import { ThemeModule } from '../@theme/theme.module';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PaginatorModule } from "../@theme/components/paginator/paginator.module";
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    NbMenuModule,
    PaginatorModule,
  ],
  declarations: [
    PagesComponent,
    ProfileComponent,
  ],
  providers: []
})
export class PagesModule { }
