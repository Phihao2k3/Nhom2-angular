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
@Component({
  selector: 'app-categories-update',
  templateUrl: './categories-update.compoment.html',
  styleUrls: ['./categories-update.compoment.scss']
})
export class CategoriesUpdateComponent {
  formCaterories: FormGroup;
  id:number;
  
  constructor(
    private categories: CategoriesService,
    private router: Router,
    private toastrService: NbToastrService ,
    private activatedRoute: ActivatedRoute,
  ) {
    this.id = this.activatedRoute.snapshot.params.id;

    this.formCaterories = new FormGroup({
      category_name: new FormControl('', Validators.required)
    })

    this.categories.getCaterogiesById(this.id).subscribe((data) => {
      
      console.log(data);
      const category = data.productcate[0];
      
      this.formCaterories.patchValue({
        category_name: category.category_name
      }); 
    });
  }

  onSubmit() {
     if (this.formCaterories.valid) {
      this.categories.updateCaterogies(this.id,this.formCaterories.value).subscribe((res) => {
        this.toastrService.show('Sửa Loại thành công', 'Thành công', {
          status: 'success',
          position: NbGlobalPhysicalPosition.TOP_RIGHT,
        });
        this.router.navigate(['/pages/categories/listCategory'])
      },
        (err) => {
          this.toastrService.show('S thất bại', 'thất bại', {
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

