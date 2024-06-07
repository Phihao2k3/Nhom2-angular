import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'app/@core/services/apis/product.service';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from 'app/@theme/components/spinner/spinner.service';
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPhysicalPosition,
} from '@nebular/theme';
import { IProduct } from 'app/@core/interfaces/product.interface';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit {
  formeditproduct: FormGroup;
  file: File | null = null;
  id: number;
  product: IProduct;
  category = [
    { id: 1, name: 'Drama' },
    { id: 2, name: 'Action' },
    { id: 3, name: 'Comedy' },
    { id: 4, name: 'Drama' },
    { id: 5, name: 'Fantasy' },
    { id: 6, name: 'Horror' },
    { id: 7, name: 'Mystery' },
    { id: 8, name: 'Romance' },
    { id: 9, name: 'Thriller' },
    { id: 10, name: 'Western' },
  ];

  constructor(
    private serviceproduct: ProductService,
    private activatedRoute: ActivatedRoute,
    private spinner: SpinnerService,
    private toastrService: NbToastrService
  ) {
    this.id = this.activatedRoute.snapshot.params.id;

    this.formeditproduct = new FormGroup({
      title: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      publisher: new FormControl('', Validators.required),
      category_id: new FormControl('', Validators.required),
      image: new FormControl(''),
      release_date: new FormControl('', Validators.required),
      stock: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });

    this.spinner.show();
    this.serviceproduct.getProductById(this.id).subscribe((data) => {
      this.spinner.hide();
      this.product = data.product[0];
      this.formeditproduct.patchValue({
        title: this.product.title,
        price: this.formatNumber(this.product.price),
        publisher: this.product.publisher,
        category_id: this.product.category_id,
        release_date: this.formatDate(this.product.release_date),
        stock: this.product.stock,
        description: this.product.description,
      });
    });
  }

  ngOnInit(): void {}

  formatDate(date: string): string {
    const d = new Date(date);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();

    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
  }

  onSubmit() {
    if (this.formeditproduct.valid) {
      let formData = new FormData();
      let priceValue = this.formeditproduct.get('price')?.value;
      priceValue = parseInt(priceValue.replace(/,/g, ''), 10);
      formData.append('title', this.formeditproduct.get('title')?.value);
      formData.append('price', priceValue.toString());
      formData.append(
        'publisher',
        this.formeditproduct.get('publisher')?.value
      );
      formData.append(
        'description',
        this.formeditproduct.get('description')?.value
      );
      formData.append(
        'category_id',
        this.formeditproduct.get('category_id')?.value
      );

      if (this.file) {
        formData.append('image', this.file as Blob);
      } else {
        formData.append('image', this.product.image);
      }

      const releaseDate = this.formeditproduct.get('release_date')?.value;
      formData.append(
        'release_date',
        new Date(releaseDate).toISOString().split('T')[0]
      );
      formData.append('stock', this.formeditproduct.get('stock')?.value);

      this.spinner.show();
      this.serviceproduct.updateProduct(this.id, formData).subscribe(
        (data) => {
          this.spinner.hide();
          this.showToast('success', 'Thành công', 'Cập nhật sản phẩm thành công');
        },
        (error) => {
          this.spinner.hide();
          this.showToast('danger', 'Thất bại', 'Cập nhật sản phẩm thất bại');
        }
      );
    } else {
      this.showToast('danger', 'Thất bại', 'Vui lòng điền đầy đủ thông tin');
    }
  }

  formatMoney(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    this.formeditproduct.get('price')?.setValue(value);
  }

  formatNumber(value) {
    if (!value) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  onFileChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.file = file;
    }
  }

  private showToast(status: NbComponentStatus, title: string, message: string) {
    this.toastrService.show(message, title, {
      status,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
    });
  }
}
