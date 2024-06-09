import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CategoriesService } from 'app/@core/services/apis/categories.service';
import { Router } from '@angular/router';
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPhysicalPosition,
} from '@nebular/theme';
@Component({
  selector: 'app-categories-add',
  templateUrl: './categories-add.compoment.html',
  styleUrls: ['./categories-add.compoment.scss']
})
export class CategoriesAddComponent {
  formCaterories: FormGroup;
  constructor(private categories: CategoriesService, private router: Router,private toastrService: NbToastrService) {
    this.formCaterories = new FormGroup({
      category_name: new FormControl('', Validators.required)

    })
  }



  onSubmit() {

    if (this.formCaterories.valid) {
      this.categories.createCaterogies(this.formCaterories.value).subscribe((res) => {
        this.toastrService.show('Thêm Loại thành công', 'Thành công', {
          status: 'success',
          position: NbGlobalPhysicalPosition.TOP_RIGHT,
        });
        this.router.navigate(['/pages/categories/listCategory'])
      },
        (err) => {
          this.toastrService.show('thêm thất bại', 'thất bại', {
            status: 'danger',
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
          });
          console.log(err);
        }
      )
    }
    else {
      this.toastrService.show('Vui lòng nhập đủ thông tin', 'thất bại', {
        status: 'danger',
        position: NbGlobalPhysicalPosition.TOP_RIGHT,
      });
    }

    console.log(this.formCaterories.value);
  }
  private showToast(status: NbComponentStatus, title: string, message: string) {
    this.toastrService.show(message, title, {
      status,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
    });
  }
}

