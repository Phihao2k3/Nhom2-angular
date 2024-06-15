import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeleteComponent } from './deletecomponent';
import { NbDialogService, NbIconConfig, NbToastrService } from '@nebular/theme';
import { EditComponent } from './EditComponent';
import { AttendanceListComponent } from '../attendance-list/attendance-list.component'; 

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
      <button nbButton status="danger" (click)="deleteButton(rowData)">
        <nb-icon icon="trash-2-outline" size="small"></nb-icon>
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



  // editButton(file) {
  //   const dialog = this.dialogService.open(EditComponent, {
  //     context: {
  //       title: 'Cập nhật đơn vị',
  //     },
  //   });
  //   dialog.onClose.subscribe((dialogResult) => {
  //     if (dialogResult) {
  //       this.unitComponent.editProduct(file.inventory_id);
        
  //     } else if (dialogResult == false) {
  //       const iconConfig: NbIconConfig = {
  //         icon: 'bookmark-outline',
  //         pack: 'eva',
  //         status: 'danger',
  //       };
  //       this.toastrService.show('', `Cập nhật thất bại`, iconConfig);
  //     }
  //   });
  // }
}
