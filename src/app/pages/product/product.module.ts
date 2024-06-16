import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule and ReactiveFormsModule
import {
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbTreeGridModule,
  NbActionsModule,
  NbButtonModule,
  NbCheckboxModule,
  NbToastrModule,
  NbDatepickerModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import {
  productRoutingModule,
  routedComponents,
} from './product-routing.module';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ButtonComponent } from './button/button.component';
import { EditComponent } from './button/EditComponent';
import { DeleteComponent } from './button/deletecomponent';
@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    productRoutingModule,
    Ng2SmartTableModule,
    NbActionsModule,
    NbButtonModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    Ng2SmartTableModule,
    FormsModule, // Add FormsModule here
    ReactiveFormsModule, // Add ReactiveFormsModule here
    NbToastrModule.forRoot(),
  ],
  declarations: [
    ...routedComponents,
    UpdateProductComponent,
    ButtonComponent,
    EditComponent,
    DeleteComponent,
  ],
})
export class ProductModule {}
