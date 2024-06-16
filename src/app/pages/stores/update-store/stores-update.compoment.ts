import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CategoriesService } from 'app/@core/services/apis/categories.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPhysicalPosition,
} from '@nebular/theme';
import { StoreService } from 'app/@core/services/apis/store.service';
import { SpinnerService } from 'app/@theme/components/spinner/spinner.service';


@Component({
  selector: 'app-stores-update',
  templateUrl: './stores-update.compoment.html',
  styleUrls: ['./stores-update.compoment.scss']
})
export class StoreUpdateComponent {
  formUpdateStores: FormGroup;
  id: number;

  constructor(
    private store: StoreService,
    private router: Router,
    private toastrService: NbToastrService,
    private activatedRoute: ActivatedRoute,
    private spinner: SpinnerService
  ) {

    this.id = this.activatedRoute.snapshot.params.id;

    this.formUpdateStores = new FormGroup({
      store_name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      phone_number: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{10}$/)  
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ])
    });
    this.spinner.show();

    this.store.getStoreById(this.id).subscribe((data) => {
      this.spinner.hide();

      let store = data.stores[0];

      this.formUpdateStores.patchValue({
        store_name: store.store_name,
        address: store.address,
        phone_number: store.phone_number,
        email: store.email,
      })
    })
  }

  onSubmit() {
    if (this.formUpdateStores.valid) {
      this.store.updateStore(this.id, this.formUpdateStores.value).subscribe(
        (res) => {
          this.spinner.hide();
          this.showToast('success', 'Thành công', 'Cập nhật cửa hàng thành công!');
          this.router.navigate(['/pages/store/liststore'])
        },
        (err) => {
          this.spinner.hide();
          this.showToast('danger', 'Thất bại', 'Cập nhật cửa hàng thất bại!');
          console.log(err);
        }
      )
    }
    else {
      this.showToast('danger', 'Thất bại', 'Vui lòng điền đủ thông tin!');
    }

  }
  private showToast(status: NbComponentStatus, title: string, message: string) {
    this.toastrService.show(message, title, {
      status,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
    });
  }
}

