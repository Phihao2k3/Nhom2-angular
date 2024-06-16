import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NbDialogService, NbIconConfig, NbToastrService } from '@nebular/theme';
import { checkoutcomponent } from './checkout.component';
import { AttendanceListComponent } from '../attendance-list/attendance-list.component';
import  {EditComponent} from './EditComponent';
@Component({
  selector: 'ngx-btn-action',
  template: `
    <div class="d-flex justify-content-around">
      <button
        nbButton
        status="primary"
        (click)="editButton(rowData)"
        class="me-1"
      >
        <nb-icon icon="edit-outline" size="small"></nb-icon>
      </button>
      <button
        nbButton
        status="success"
        (click)="checkout(rowData)"
        class="me-1"
      >
        <nb-icon icon="checkmark-circle-2-outline" size="small"></nb-icon>
      </button>
    </div>
  `,
})
export class ButtonComponent implements OnInit {
  @Input() rowData;
  ngOnInit() {}

  constructor(
    private dialogService: NbDialogService,
    private unitComponent: AttendanceListComponent,
    private toastrService: NbToastrService
  ) {}

  checkout(rowData) {
    const dialog = this.dialogService.open(checkoutcomponent, {
      context: {
        title: 'Xóa chấm công',
        id: rowData.attendance_id,
      },
    });
    dialog.onClose.subscribe((dialogResult) => {
      if (dialogResult) {
        this.unitComponent.checkout(rowData);
      } else if (dialogResult == false) {
        const iconConfig: NbIconConfig = {
          icon: 'bookmark-outline',
          pack: 'eva',
          status: 'danger',
        };
        this.toastrService.show('', `Xóa thất bại`, iconConfig);
      }
    });
  }

  editButton(file) {
  
    const dialog = this.dialogService.open(EditComponent, {
      context: {
        title: 'Cập nhật đơn vị',
      },
    });
    dialog.onClose.subscribe((dialogResult) => {
      if (dialogResult) {
        this.unitComponent.editProduct(file);
      } else if (dialogResult == false) {
        const iconConfig: NbIconConfig = {
          icon: 'bookmark-outline',
          pack: 'eva',
          status: 'danger',
        };
        this.toastrService.show('', `Cập nhật thất bại`, iconConfig);
      }
    });
  }
}
