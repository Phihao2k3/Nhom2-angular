import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-delete',
  template: `
    <nb-card>
      <nb-card-header>{{ title }}</nb-card-header>
      <nb-card-body>
        Bạn có chắc chắn muốn kết thúc phiên làm việc này không?
      </nb-card-body>
      <nb-card-footer>
        <button nbButton status="danger" (click)="confirm()">Kết thúc</button>
        <button nbButton status="basic" (click)="dismiss()">Hủy</button>
      </nb-card-footer>
    </nb-card>
  `,
})
export class checkoutcomponent {
  @Input() title: string;
  @Input() id: any;

  constructor(protected ref: NbDialogRef<checkoutcomponent>) {}

  confirm() {
    this.ref.close(true);
  }

  dismiss() {
    this.ref.close(false);
  }
}
