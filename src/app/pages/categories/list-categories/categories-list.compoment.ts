import { Component, Input, OnInit } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { CategoriesService } from 'app/@core/services/apis/categories.service';
import { ButtonComponent } from '../button/button.component';
import { EditComponent } from '../button/EditComponent'; 
import { DeleteComponent } from '../button/deletecomponent';
import { Router } from '@angular/router';
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPhysicalPosition,
} from '@nebular/theme';
@Component({
  selector: 'ngx-tree-grid',
  templateUrl: './categories-list.compoment.html',
  styleUrls: ['./categories-list.compoment.scss'],
})
export class CategorieslistComponent implements OnInit {
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,

    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      category_id: {
        title: 'ID',
        hide: true,
      },
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
      category_name: {
        title: 'loại',
      },
      customColumn: {
        title: '',
        type: 'custom',
        renderComponent: ButtonComponent,
        filter: false,
        sort: false,
      },



    },
    actions:
    {
      // Define actions column
      title: 'Actions',
      type: 'html',
      position: 'right',
      add: false,
      edit: false,
      delete: false,
      selector: false,
    }
    
  };

  data = [


  ];

  constructor(private CategoriesService: CategoriesService,
    private toastrService: NbToastrService,
    private router: Router
    
  ) { }

  ngOnInit(): void {
    this.getCategory()
  }

  getCategory() {
    this.CategoriesService.getallCategories().subscribe(
      (res) => {
        this.data = res.productcate


        console.log(this.data);
      },
      (err) => {
        console.log(err);
      }
    )
  }
  oonSaveConfirm(event) {
    let id = event.data.category_id
    this.CategoriesService.updateCaterogies(id, event.newData).subscribe((res) => {
      this.showToast('success', 'Thành công', 'Sửa loại thành công');
      this.getCategory();
    },
      (err) => {
        this.showToast('danger', 'Thất bại', 'sửa thất bại ');
        this.getCategory();

      })
  }

  onDeleteConfirm(event) {
     
    this.CategoriesService.deleteCaterogies(event.category_id).subscribe(
      (res) => {
     
        this.getCategory();
      },
      (err) => {
        this.showToast('danger', 'Thất bại', 'Xóa hóa đơn thất bại');
     
      },
    )
     
  }

  editCate(id): void {
    this.router.navigate(['/pages/categories/updateCategory/', id]);
    console.log(id);
    
  }


  private showToast(status: NbComponentStatus, title: string, message: string) {
    this.toastrService.show(message, title, {
      status,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
    });
  }

}

