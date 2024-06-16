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
import { ButtonComponent } from '../button/button.component';
@Component({
  selector: 'basic-example-data',
  template: `
    <ng2-smart-table [settings]="settings" [source]="data"></ng2-smart-table>
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
      customColumn: {
        title: '',
        type: 'custom',
        renderComponent: ButtonComponent,
        filter: false,
        sort: false,
      },
    },
    actions: {
      // Define actions column
      title: 'Actions',
      type: 'html',
      position: 'right',
      add: false,
      edit: false,
      delete: false,
      selector: false,
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
    this.productService.deleteProduct(event.product_id).subscribe(
      (res) => {
       
        this.getallProducts();
      },
      (err) => {
        this.showToast('danger', 'Thất bại', 'Xóa sản phẩm thất bại');
        
      }
    );
  }
  editProduct(id): void {
    this.Router.navigate(['/pages/product/editproduct/', id]);
  }
  private showToast(status: NbComponentStatus, title: string, message: string) {
    this.toastrService.show(message, title, {
      status,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
    });
  }
}
