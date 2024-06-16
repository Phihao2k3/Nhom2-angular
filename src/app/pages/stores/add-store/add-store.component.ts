import { Component, OnInit } from '@angular/core';
import { StoreService } from 'app/@core/services/apis/store.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';

@Component({
  selector: 'ngx-form-inputs',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.scss'],
})
export class AddStoreComponent implements OnInit {
  formAddStore: FormGroup;

  constructor(private store: StoreService, private router: Router, private toastrService: NbToastrService) {
    this.formAddStore = new FormGroup({
      store_name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      phone_number: new FormControl('', [
        Validators.required,
        Validators.pattern((/^\d{10}$/))
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ])
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    if (this.formAddStore.valid) {
      this.store.createStore(this.formAddStore.value).subscribe((res) => {
        this.showToast('success', 'Thành công', 'Thêm thành công');
        this.router.navigate(['/pages/store/liststore'])
      },
        (err) => {
          console.log(err);
        }
      )
    }
    else {
      this.showToast('danger', 'Thất bại', 'Thêm thất bại');
    }
    console.log(this.formAddStore.value);
  }

  private showToast(status: NbComponentStatus, title: string, message: string) {
    this.toastrService.show(message, title, {
      status,
      position: NbGlobalPhysicalPosition.TOP_RIGHT
    })
  }
}
