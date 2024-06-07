import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ProductService } from 'app/@core/services/apis/product.service';
import {
  AlertShowcaseComponent,
  IAlertMessage,
} from 'app/@theme/components/alert/ngx-alerts.component';
import { IProduct } from 'app/@core/interfaces/product.interface';
import { SpinnerService } from 'app/@theme/components/spinner/spinner.service';
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPhysicalPosition,
} from '@nebular/theme';
@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./product-add.compoment.scss'],
  templateUrl: './product-add.compoment.html',
})
export class productaddComponent implements OnInit {
  formaddproduct: FormGroup;
  file: File | null = null;

  constructor(
    private serviceproduct: ProductService,
    private spinner: SpinnerService,
    private toastrService: NbToastrService
  ) {
    this.formaddproduct = new FormGroup({
      title: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      publisher: new FormControl('', Validators.required),
      category_id: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      release_date: new FormControl('', Validators.required),
      stock: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }
  ngOnInit(): void {}
  onSubmit() {
    if (this.formaddproduct.valid) {
      let formData = new FormData();
      let priceValue = this.formaddproduct.get('price')?.value;
      priceValue = parseInt(priceValue.replace(/,/g, ''), 10);
      formData.append('title', this.formaddproduct.get('title')?.value);
      formData.append('price', priceValue.toString());
      formData.append('publisher', this.formaddproduct.get('publisher')?.value);
      formData.append(
        'description',
        this.formaddproduct.get('description')?.value
      );
      formData.append(
        'category_id',
        this.formaddproduct.get('category_id')?.value
      );
      formData.append('image', this.file as Blob);
      formData.append(
        'release_date',
        this.formaddproduct.get('release_date')?.value
      );
      formData.append('stock', this.formaddproduct.get('stock')?.value);
      this.spinner.show();
      this.serviceproduct.createProduct(formData).subscribe(
        (res) => {
          this.toastrService.show('Thêm sản phẩm thành công', 'Thành công', {
            status: 'success',
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
          });
          this.spinner.hide();
        },
        (err) => {
          this.toastrService.show('Thêm sản phẩm thất bại', 'Thất bại', {
            status: 'danger',
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
          });
          this.spinner.hide();
        }
      );
    } else {
      this.toastrService.show('Vui lòng điền đầy đủ thông tin', 'Thất bại', {
        status: 'danger',
        position: NbGlobalPhysicalPosition.TOP_RIGHT,
      });
    }
  }
  onFileChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.file = file;
    }
  }
  formatMoney(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    this.formaddproduct.get('price')?.setValue(value);
  }
  private showToast(status: NbComponentStatus, title: string, message: string) {
    this.toastrService.show(message, title, {
      status,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
    });
  }
}
