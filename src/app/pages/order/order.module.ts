import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbActionsModule,
    NbButtonModule, NbCheckboxModule, NbDatepickerModule, NbRadioModule, NbSelectModule, NbUserModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { OrderRoutingModule, routedComponents } from './order-routing.module';
// import { FsIconComponent } from './list-user/list-user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ButtonComponent } from './order-list/button/button.component';
import { DeleteComponent } from './order-list/button/deletecomponent';
import { EditComponent } from './order-list/button/EditComponent';
import { OderUpdateComponent } from './oder-update/oder-update.component';
@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    OrderRoutingModule,
    Ng2SmartTableModule,
    NbActionsModule,
    NbButtonModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    FormsModule ,
    ReactiveFormsModule
  ],
  declarations: [
    ...routedComponents,
    ButtonComponent,
    DeleteComponent,
    EditComponent,
    OderUpdateComponent,
  ],
})
export class OrderModule { }
