import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EmployeesService } from 'app/@core/services/apis/employees.service';
import { Router } from '@angular/router';

import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPhysicalPosition,
} from '@nebular/theme';
@Component({
  selector: 'app-employees-add',
  templateUrl:'./employees-add.compoment.html',
  styleUrls: ['./employees-add.compoment.scss']
})
export class EmployeesAddComponent {
  formEmployees: FormGroup;
  constructor(private employees: EmployeesService, private router: Router,private toastrService: NbToastrService) {
    this.formEmployees = new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone_number: new FormControl('', Validators.required),
      hire_date: new FormControl('', Validators.required),
      job_title: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required),
      store_id : new FormControl('', Validators.required),
    })
  }



  onSubmit() {

    if (this.formEmployees.valid) {
      this.employees.createEmployees(this.formEmployees.value).subscribe((res) => {
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

    console.log(this.formEmployees.value);
  }
  private showToast(status: NbComponentStatus, title: string, message: string) {
    this.toastrService.show(message, title, {
      status,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
    });
  }
}

