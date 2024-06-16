import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-delete',
  template: `
    <nb-card>
      <nb-card-header>{{ title }}</nb-card-header>
      <nb-card-body>
        Bạn có chắc chắn muốn cập nhật tài liệu này không? <br>
        <span class="text-danger">Lưu ý: chỉ có quản lý và cấp trên mới có quyền chỉnh sửa!</span>
      </nb-card-body>
      <nb-card-footer>
        <button nbButton status="danger" (click)="confirm()">Cập nhật</button>
        <button nbButton status="basic" (click)="dismiss()">Hủy</button>
      </nb-card-footer>
    </nb-card>
  `,
})
export class EditComponent {
  @Input() title: string;
  @Input() id: any;

  constructor(protected ref: NbDialogRef<EditComponent>) {}

  confirm() {
    this.ref.close(true);
  }

  dismiss() {
    this.ref.close(false);
  }
}
