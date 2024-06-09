import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbActionsModule,
    NbButtonModule,NbCheckboxModule, NbDatepickerModule,NbRadioModule,NbSelectModule,NbUserModule} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { employeesRoutingModule, routedComponents } from './employees-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeesAddComponent } from './add-employees/employees-add.compoment';

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    employeesRoutingModule,
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
    
    

  ],
  declarations: [
    ...routedComponents,

  ],
})
export class employeesModule { }
