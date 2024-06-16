import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbActionsModule,
         NbButtonModule,NbCheckboxModule, NbDatepickerModule,NbRadioModule,NbSelectModule,NbUserModule} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { UserRoutingModule, routedComponents } from './user-routing.module';
import { PaginatorComponent } from 'app/@theme/components/paginator/paginator.component';
import { PaginatorModule } from 'app/@theme/components/paginator/paginator.module';
// import { FsIconComponent } from './list-user/list-user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EditComponent } from './button/EditComponent';
import { DeleteComponent } from './button/deletecomponent';
import { ButtonComponent } from './button/button.component';
import { UpdateUserComponent } from './update-user/update-user.component';
@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    UserRoutingModule,
    Ng2SmartTableModule,
    NbActionsModule,
    NbButtonModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorModule,
  
  ],
  declarations: [
    ...routedComponents,
    // FsIconComponent,
    EditComponent,
    DeleteComponent,
    ButtonComponent,
    UpdateUserComponent
  ],
})
export class UserModule { }
