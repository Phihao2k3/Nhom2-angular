import { Component } from '@angular/core';
import { OrderService } from 'app/@core/services/apis/order.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Sử dụng FormBuilder để tạo FormGroup
import { UserService } from 'app/@core/services/apis/user.service';
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPhysicalPosition,
} from '@nebular/theme';

@Component({
  selector: 'app-store_inventory-add',
  templateUrl: './store_inventory-add.component.html',
  styleUrls: ['./store_inventory-add.component.scss']
})
export class StoreInventoryAddComponent {
  

  
}
