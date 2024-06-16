import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-delete',
  template: `
    <nb-card>
      <nb-card-header>{{ title }}</nb-card-header>
      <nb-card-body>
        Bạn có chắc chắn muốn xóa tài liệu này không?
      </nb-card-body>
      <nb-card-footer> 
        <button nbButton status="danger" (click)="confirm()">Xóa</button>
        <button nbButton status="basic" (click)="dismiss()">Hủy</button>
      </nb-card-footer>
    </nb-card>
  `,
})
export class DeleteComponent {
  @Input() title: string;
  @Input() id: any;

  constructor(protected ref: NbDialogRef<DeleteComponent>) {}

  confirm() {
    this.ref.close(true);
  }

  dismiss() {
    this.ref.close(false);
  }
}
