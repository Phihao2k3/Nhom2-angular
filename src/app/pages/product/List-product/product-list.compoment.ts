import { Component, OnInit } from '@angular/core';
import { IProduct } from 'app/@core/interfaces/product.interface';
import { ProductService } from 'app/@core/services/apis/product.service';
import { NbDialogService } from '@nebular/theme';
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPhysicalPosition,
} from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'basic-example-data',
  template: `
    <ng2-smart-table
      [settings]="settings"
      [source]="data"
      (deleteConfirm)="onDeleteConfirm($event)"
      (editConfirm)="onSaveConfirm($event)"
    ></ng2-smart-table>
  `,
})
export class productlistComponent implements OnInit {
  product: IProduct;
  settings = {
    edit: {
      editButtonContent: '<i class="nb-edit"></i>', 
      confirmSave: true,
      saveButtonContent: '<i class="nb-checkmark"></i>', 
      cancelButtonContent: '<i class="nb-close"></i>', 
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      index: {
        title: 'STT',
        type: 'number',
        filter: false,
        editable: false,
        addable: false,
        valuePrepareFunction: (value, row, cell) => {
          return cell.row.index + 1;
        },
      },
      product_id: {
        title: 'ID',
        type: 'number',
        filter: false,
        hide: true,
        editable: false,
      },
      title: {
        title: 'Tên sản phẩm', 
        editable: false,
      },
      price: {
        title: 'Giá tiền', 
        editable: false,
      },
      publisher: {
        title: 'NXB', 
        editable: false,
      },
      image: {
        title: 'hình ảnh',
        editable: false,

        type: 'html',
      },
      release_date: {
        title: 'Ngày ra mắt',
        editable: false,
      
      },
      stock: {
        title: 'Số lượng', 
        editable: false,
      },
    },
    actions: {
      // Define actions column
      title: 'Actions',
      type: 'html',
      filter: false,
      sort: false,
      add: false,
      position: 'right',
    },
  };

  data = [];

  constructor(
    private productService: ProductService,
    private toastrService: NbToastrService,
    private Router: Router,
    private dialogService: NbDialogService
  ) {} // Inject NbToastrService

  ngOnInit(): void {
    this.getallProducts();
  }

  getallProducts() {
    this.productService.getallProducts().subscribe(
      (res) => {
        res.product.forEach((element) => {
          element.price = this.formatNumber(element.price);
          element.release_date = new Date(
            element.release_date
          ).toLocaleDateString();
          element.image = `<img class="object-fit-contain border rounded"  src="/uploads/${element.image}" alt="image" width="150" height="100">`;
        });
        this.data = res.product;

        console.log(this.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  formatNumber(value) {
    if (!value) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.productService.deleteProduct(event.data.product_id).subscribe(
        (res) => {
          this.showToast('success', 'Thành công', 'Xóa sản phẩm thành công');
          event.confirm.resolve();
        },
        (err) => {
          this.showToast('danger', 'Thất bại', 'Xóa sản phẩm thất bại');
          event.confirm.reject();
        }
      );
    } else {
      event.confirm.reject();
    }
  
  }
  onSaveConfirm(event): void {
    this.Router.navigate([
      '/pages/product/editproduct/' + event.newData.product_id,
    ]);
  }
  private showToast(status: NbComponentStatus, title: string, message: string) {
    this.toastrService.show(message, title, {
      status,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
    });
  }
}
