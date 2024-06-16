import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeleteComponent } from './deletecomponent';
import { NbDialogService, NbIconConfig, NbToastrService } from '@nebular/theme';
import { EditComponent } from './EditComponent';

import { CategorieslistComponent } from '../list-categories/categories-list.compoment';
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
    private unitComponent: CategorieslistComponent,
    private toastrService: NbToastrService
  ) {}

  deleteButton(data) {
    const dialog = this.dialogService.open(DeleteComponent, {
      context: {
        title: 'Bạn muốn xóa tài liệu : ' + data.title,
        id: data.id,
      },
    });
    dialog.onClose.subscribe((dialogResult) => {
      console.log(dialogResult);

      if (dialogResult) {
        this.unitComponent.onDeleteConfirm(data);
        const iconConfig: NbIconConfig = {
          icon: 'bookmark-outline',
          pack: 'eva',
          status: 'success',
        };
        this.toastrService.show('', `Đã xóa đơn vị`, iconConfig);
      } else if (dialogResult == false) {
        const iconConfig: NbIconConfig = {
          icon: 'bookmark-outline',
          pack: 'eva',
          status: 'danger',
        };
        this.toastrService.show('', `Xóa đơn vị thất bại`, iconConfig);
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
        this.unitComponent.editCate(file.category_id);
        
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
