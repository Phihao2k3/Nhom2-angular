import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbActionsModule,
    NbButtonModule,NbCheckboxModule, NbDatepickerModule,NbRadioModule,NbSelectModule,NbUserModule} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { categoriesRoutingModule, routedComponents } from './categories-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesAddComponent } from './add-categories/categories-add.compoment';
import { ButtonComponent } from './button/button.component';
import { EditComponent } from './button/EditComponent';
import { DeleteComponent } from './button/deletecomponent';
import { CategoriesUpdateComponent } from './update-categories/categories-update.compoment';
@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    categoriesRoutingModule,
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
    CategoriesAddComponent,
    ButtonComponent,
    EditComponent,
    DeleteComponent,
    CategoriesUpdateComponent

  ],
})
export class categoriesModule { }
