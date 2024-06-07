import { Component, Input, OnInit } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { CategoriesService } from 'app/@core/services/apis/categories.service';
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
      category_name: {
        title: 'loại',
      }


    },
    actions: {
      // Define actions column
      title: 'Actions',
      type: 'html',
      filter: false,
      sort: false,
      add: false,
    },
  };

  data = [


  ];

  constructor(private CategoriesService: CategoriesService,
    private toastrService: NbToastrService
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
  onSaveConfirm(event) {
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
      let id = event.data.category_id;
      this.CategoriesService.deleteCaterogies(id).subscribe((res) => {
          this.showToast('success', 'Thành công', 'Xóa loại thành công');
          this.getCategory();
        },
        (err) => {
          this.showToast('danger', 'Thất bại', 'Xóa loại thất bại');
        }
      );
    
  }







  private showToast(status: NbComponentStatus, title: string, message: string) {
    this.toastrService.show(message, title, {
      status,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
    });
  }
}

