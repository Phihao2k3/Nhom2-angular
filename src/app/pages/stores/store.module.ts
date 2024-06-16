import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbActionsModule,
         NbButtonModule,NbCheckboxModule, NbDatepickerModule,NbRadioModule,NbSelectModule,NbUserModule} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { StoreRoutingModule, routedComponents } from './store-routing.module';
// import { FsIconComponent } from './list-user/list-user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EditComponent } from './button/EditComponent';
import { ButtonComponent } from './button/button.component';
import { DeleteComponent } from './button/deletecomponent';
import { CategoriesUpdateComponent } from '../categories/update-categories/categories-update.compoment';
import { StoreUpdateComponent } from './update-store/stores-update.compoment';

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    StoreRoutingModule,
    Ng2SmartTableModule,
    NbActionsModule,
    NbButtonModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...routedComponents,
    ButtonComponent,
    EditComponent,
    DeleteComponent,
    StoreUpdateComponent
   

    // FsIconComponent,
  ],
})
export class StoreModule { }
