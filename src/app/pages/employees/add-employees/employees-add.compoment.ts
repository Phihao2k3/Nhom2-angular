import { Component } from '@angular/core';
import { EmployeesService } from 'app/@core/services/apis/employees.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Sử dụng FormBuilder để tạo FormGroup
import { IEmployee } from 'app/@core/interfaces/employee.interface';
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPhysicalPosition,
} from '@nebular/theme';
import { StoreService } from 'app/@core/services/apis/store.service';

@Component({
  selector: 'app-employeeadd',
  templateUrl: './employees-add.compoment.html',
  styleUrls: ['./employees-add.compoment.scss']
})
export class EmployeesAddComponent {
  formEmployees: FormGroup;
  
   storelist: { store_id: number, store_name: string }[] = [];

  constructor(
    private Emp: EmployeesService,
    private router: Router,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder,
    private store: StoreService
  ) {
    this.formEmployees = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      hire_date: ['', Validators.required],
      job_title: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
      store_id: ['', Validators.required],
    });
    // this.getEmployees();
    this.getStore();
  }

  onSubmit() {
    if (this.formEmployees.valid) {
      this.Emp.createEmployees(this.formEmployees.value).subscribe(
        (res) => {
          this.showToast('success', 'Thành công', 'Thêm nhân viên thành công');
          this.router.navigate(['pages/employees/listEmployees']);
        },
        (err) => {
          console.log(err);
          this.showToast('danger', 'Thất bại', 'Thêm nhân viên thất bại');
        }
      );
    } else {
      this.showToast('danger', 'Lỗi', 'Vui lòng điền đầy đủ thông tin cần thiết');
    }
  }

  getEmployees() {
    this.Emp.getallEmployees().subscribe(
      (res) => {
        this.formEmployees = res.employeelist;
        console.log(this.formEmployees);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  getStore() {
    this.store.getAllStore().subscribe(res => {
      this.storelist = res.stores;
     ;this.storelist.forEach((store) => {
      console.log(store);
      
     })
    },
      (err) => {
        console.log(err);
      });

  }
  private showToast(status: NbComponentStatus, title: string, message: string) {
    this.toastrService.show(message, title, {
      status,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
    });
  }


}
