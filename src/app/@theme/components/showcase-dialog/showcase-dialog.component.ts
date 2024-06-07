import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-showcase-dialog',
  template:`<nb-card>
  <nb-card-header>{{ title }}</nb-card-header>
  <nb-card-body>
    
  </nb-card-body>
  <nb-card-footer>
    <button nbButton hero status="primary" (click)="dismiss()">Dismiss Dialog</button>
  </nb-card-footer>
</nb-card>`,
  styles: [`
    nb-card {
      max-width: 20rem;
    }
  `],
})
export class ShowcaseDialogComponent {

  @Input() title: string;

  constructor(protected ref: NbDialogRef<ShowcaseDialogComponent>) {}

  dismiss() {
    this.ref.close();
  }
}
