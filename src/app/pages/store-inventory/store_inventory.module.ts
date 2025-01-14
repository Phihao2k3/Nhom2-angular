import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbActionsModule,
    NbButtonModule, NbCheckboxModule, NbDatepickerModule, NbRadioModule, NbSelectModule, NbUserModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { StoreInventoryRoutingModule, routedComponents } from './store_inventory-routing.module';
// import { FsIconComponent } from './list-user/list-user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ButtonComponent } from './button/button.component';
import { DeleteComponent } from './button/deletecomponent';
import { EditComponent } from './button/EditComponent';
import { StoreInventoryUpdateComponent } from './store_inventory-update/store_inventory-update.component';
@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    StoreInventoryRoutingModule,
    Ng2SmartTableModule,
    NbActionsModule,
    NbButtonModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    FormsModule ,
    ReactiveFormsModule,
    
    
    
  ],
  declarations: [
    ...routedComponents,
    ButtonComponent,
    DeleteComponent,
    EditComponent,
    StoreInventoryUpdateComponent
    
   
    // FsIconComponent,
  ],
})
export class store_inventoryModule { }
